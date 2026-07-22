import { computeRating } from '../data/feedback';
import type { ChoiceDef, PendingShadow, Player, ShadowBeat } from '../types';
import { applyQuality, pickNextOffice } from './game';
import { qualityFromBand, valenceFromBand } from './outcomes';
import { Rng, clamp } from './rng';

const SHADOW_WIN_CHOICE: ChoiceDef = {
  kind: 'risk',
  label: 'Trato en la sombra',
  hint: 'atajo',
  ok: 'El atajo funciona.',
  fail: 'El atajo se rompe.',
  advanceBias: 5,
};

const SHADOW_LOSE_CHOICE: ChoiceDef = {
  kind: 'risk',
  label: 'Trato en la sombra',
  hint: 'precipicio',
  ok: 'El atajo funciona.',
  fail: 'El atajo se rompe.',
  advanceBias: -2,
};

export function markShadowPresented(player: Player, offerId: string): Player {
  const seen = player.seenShadowIds.includes(offerId)
    ? player.seenShadowIds
    : [...player.seenShadowIds, offerId];
  return {
    ...player,
    seenShadowIds: seen,
    shadowCount: player.shadowCount + 1,
    shadowCooldown: true,
  };
}

export function clearShadowCooldown(player: Player): Player {
  if (!player.shadowCooldown) return player;
  return { ...player, shadowCooldown: false };
}

export function resolveShadow(
  player: Player,
  pending: PendingShadow,
): { player: Player; beat: ShadowBeat } {
  const { offer, win } = pending;
  const rng = new Rng(player.seed + offer.id.length * 53 + player.turn * 29 + (win ? 7 : 11));
  const fromOffice = player.office;
  const band = win ? 'boom' : 'crash';
  const quality = qualityFromBand(band);
  const choice = win ? SHADOW_WIN_CHOICE : SHADOW_LOSE_CHOICE;
  const intent = win ? 'up' : 'scandalExit';

  let marked = markShadowPresented(player, offer.id);
  const toOffice = pickNextOffice(rng, marked, band, choice, intent);

  let next = applyQuality(marked, quality, toOffice, 'risk', rng);
  next = {
    ...next,
    office: toOffice,
    officesHeld: [...next.officesHeld, { year: next.year, office: toOffice, quality }],
  };

  // Stats asimétricos del trato
  if (win) {
    next = {
      ...next,
      forma: clamp(next.forma + 10),
      fama: clamp(next.fama + 8),
      sombra: clamp(next.sombra + 14),
      etica: clamp(next.etica - 8),
      flags: [...new Set([...next.flags, 'sombra_ok', ...(offer.setFlagsWin ?? [])])],
    };
  } else {
    next = {
      ...next,
      forma: clamp(next.forma - 10),
      fama: clamp(next.fama + 4),
      sombra: clamp(next.sombra + 22),
      etica: clamp(next.etica - 16),
      escandalos: next.escandalos + 1,
      flags: [...new Set([...next.flags, 'sombra_quema', ...(offer.setFlagsLose ?? [])])],
    };
  }

  const ratingBefore = player.rating;
  next = { ...next, rating: computeRating(next) };

  const copy = win ? offer.win : offer.lose;
  const beat: ShadowBeat = {
    offerId: offer.id,
    theme: offer.theme,
    title: offer.title,
    win,
    punch: copy.punch,
    stim: copy.stim ?? [],
    fromOffice,
    toOffice: next.office,
    quality,
    valence: valenceFromBand(band),
    ratingBefore,
    ratingAfter: next.rating,
    partyAfter: next.party,
  };

  return { player: next, beat };
}
