import { computeRating, pickReaction, valenceFromQuality } from '../data/feedback';
import { getPersonality } from '../data/personalities';
import { pollsFor } from '../data/polls';
import type {
  ChoiceDef,
  ChoiceKind,
  OfficeId,
  OfficeIntent,
  OutcomeBand,
  PartyId,
  PendingEvent,
  PersonalityId,
  Player,
  Quality,
  Transition,
  TurnBeat,
} from '../types';
import { pickEvent, pickVariant, personalityOfficeBias } from './eventPicker';
import {
  intentFromBand,
  isSuccessBand,
  qualityFromBand,
  rollOutcomeBand,
  valenceFromBand,
} from './outcomes';
import { Rng, clamp } from './rng';
import {
  CIVIL_STARTS,
  GRAPH,
  TOTAL_TURNS,
  TURN_YEARS,
  getOffice,
} from '../data/catalog';

const SCANDAL_EXITS = ['tertuliano_nac', 'olvidado', 'memorias', 'analista', 'influencer_top', 'presentador'];

function transitionsFor(office: OfficeId): Transition[] {
  return GRAPH[office] ?? [{ to: 'militante', weight: 100 }];
}

export function pickNextOffice(
  rng: Rng,
  player: Player,
  band: OutcomeBand,
  choice: ChoiceDef,
  intent: OfficeIntent,
): OfficeId {
  const quality = qualityFromBand(band);
  const qScore = { excelente: 4, bien: 3, tirando: 2, mal: 1, escandalo: 0 }[quality];
  const fromTier = getOffice(player.office).tier;

  const edges = transitionsFor(player.office).map((e) => {
    let w = e.weight;
    const toTier = getOffice(e.to).tier;
    const delta = toTier - fromTier;
    const branch = getOffice(e.to).branch;

    if (e.minQ != null && qScore < e.minQ) w *= 0.12;
    if (e.rare) {
      w *= band === 'boom' ? 2.2 : band === 'win' ? 0.7 : 0.25;
      if (player.flags.includes('destino_moncloa')) w *= 3;
    }

    w *= personalityOfficeBias(player, e.to);

    switch (intent) {
      case 'up':
        if (delta >= 2) w *= choice.kind === 'risk' ? 2.2 : 0.35;
        else if (delta === 1) w *= choice.kind === 'risk' ? 1.8 : 1.15;
        else if (delta === 0) w *= 0.55;
        else w *= 0.2;
        break;
      case 'side':
        if (delta === 0) w *= 1.6;
        else if (delta === 1) w *= choice.kind === 'safe' ? 0.85 : 1.1;
        else if (delta >= 2) w *= 0.25;
        else w *= 0.45;
        break;
      case 'down':
        if (delta < 0) w *= 2.0;
        else if (delta === 0) w *= 1.1;
        else w *= 0.35;
        break;
      case 'scandalExit':
        if (SCANDAL_EXITS.includes(e.to) || branch === 'media' || branch === 'retiro') w *= 3.2;
        if (delta < 0) w *= 1.8;
        if (delta > 0) w *= 0.15;
        break;
    }

    if (choice.kind === 'safe' && delta >= 2) w *= 0.4;
    if (choice.kind === 'risk' && delta > 0 && (band === 'boom' || band === 'win')) w *= 1.35;
    if (player.turn >= 9 && branch === 'retiro') w *= 1.55;
    if (player.turn < 5 && delta < 0) w *= 0.35;

    return { ...e, weight: Math.max(0.01, w) };
  });

  let pick = rng.weighted(edges).to;
  if (pick === player.office && intent !== 'side') {
    const alts = edges.filter((e) => e.to !== player.office);
    if (alts.length) pick = rng.weighted(alts).to;
  }
  if (player.turn < 5 && getOffice(pick).tier < fromTier && intent !== 'scandalExit' && intent !== 'down') {
    const ups = edges.filter((e) => getOffice(e.to).tier >= fromTier);
    if (ups.length) pick = rng.weighted(ups).to;
  }
  return pick;
}

export function applyQuality(player: Player, quality: Quality, to: OfficeId, kind: ChoiceKind, rng: Rng): Player {
  let { forma, fama, sombra, etica, escandalos, traiciones, derrotas, victorias, aniosGobierno } = player;
  switch (quality) {
    case 'excelente':
      forma = clamp(forma + 12);
      fama = clamp(fama + 10);
      victorias++;
      break;
    case 'bien':
      forma = clamp(forma + 5);
      fama = clamp(fama + 4);
      victorias++;
      break;
    case 'tirando':
      forma = clamp(forma - 1);
      break;
    case 'mal':
      forma = clamp(forma - 8);
      fama = clamp(fama - 3);
      derrotas++;
      break;
    case 'escandalo':
      forma = clamp(forma - 14);
      fama = clamp(fama + 6);
      sombra = clamp(sombra + 18);
      etica = clamp(etica - 10);
      escandalos++;
      derrotas++;
      break;
  }
  if (kind === 'safe') etica = clamp(etica + 2);
  if (kind === 'risk') {
    sombra = clamp(sombra + 2);
    etica = clamp(etica - 1);
  }
  if (getOffice(to).tier >= 7) aniosGobierno += 2;
  if (to === 'presidente') aniosGobierno += 3;
  if (rng.chance(0.1)) traiciones++;
  return { ...player, forma, fama, sombra, etica, escandalos, traiciones, derrotas, victorias, aniosGobierno };
}

function hashSeed(name: string, party: PartyId, personality: PersonalityId, salt: number): number {
  let h = salt >>> 0;
  const s = `${name}|${party}|${personality}`;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0);
  return (h || 1) >>> 0;
}

export function createPlayer(name: string, party: PartyId, personality: PersonalityId): Player {
  const seed = hashSeed(name.trim() || 'Anonimo', party, personality, Date.now() % 1e9);
  const rng = new Rng(seed);
  const start = rng.pick(CIVIL_STARTS);
  const flags: string[] = [];
  if (rng.chance(0.012)) flags.push('destino_moncloa');
  if (rng.chance(0.02)) flags.push('destino_suarez');
  if (party === 'upyd') flags.push('destino_naranja_light');

  const mods = getPersonality(personality).mods;

  return {
    name: name.trim() || 'Anónimo',
    party,
    personality,
    seed,
    year: TURN_YEARS[0]!,
    age: 18,
    office: start,
    forma: clamp(45 + rng.float(-8, 12) + mods.forma),
    fama: clamp(15 + rng.float(0, 15) + mods.fama),
    sombra: clamp(5 + rng.float(0, 10) + mods.sombra),
    etica: clamp(55 + rng.float(-8, 20) + mods.etica),
    escandalos: 0,
    traiciones: 0,
    derrotas: 0,
    victorias: 0,
    aniosGobierno: 0,
    officesHeld: [{ year: 2008, office: start, quality: 'tirando' }],
    flags,
    seenEventIds: [],
    seenShadowIds: [],
    seenReactions: [],
    shadowCount: 0,
    shadowCooldown: false,
    turn: 0,
    totalTurns: TOTAL_TURNS,
    retired: false,
    rating: 50,
  };
}

export function buildPending(player: Player): PendingEvent {
  const yearFrom = TURN_YEARS[player.turn] ?? player.year;
  const yearTo = TURN_YEARS[Math.min(player.turn + 1, TURN_YEARS.length - 1)] ?? 2030;
  const event = pickEvent(player, yearFrom);
  const variant = pickVariant(event, player);
  return {
    event,
    variant,
    polls: pollsFor(yearFrom),
    yearFrom,
    yearTo,
  };
}

export function resolveChoice(
  player: Player,
  pending: PendingEvent,
  kind: ChoiceKind,
): { player: Player; beat: TurnBeat } {
  const choice = kind === 'safe' ? pending.variant.safe : pending.variant.risk;
  const rng = new Rng(
    player.seed + player.turn * 131 + kind.length * 17 + pending.event.id.length * 7 + player.office.length,
  );

  const band = rollOutcomeBand(rng, player, choice);
  const quality = qualityFromBand(band);
  const success = isSuccessBand(band, rng);
  const intent = intentFromBand(band, kind);
  const fromOffice = player.office;

  let party = player.party;
  let flags = [...player.flags];

  // Transfuguismo: casi solo risk + no crash
  if (choice.switchTo) {
    const canSwitch =
      kind === 'risk' && band !== 'crash'
        ? success || band === 'win' || band === 'boom' || (band === 'hold' && rng.chance(0.35))
        : kind === 'risk' && band === 'crash' && rng.chance(0.12);
    if (canSwitch) {
      party = choice.switchTo;
      if (party !== player.party) flags.push(`sw_${party}`);
      if (party === 'ciudadanos') flags.push('destino_naranja');
      if (party === 'podemos') flags.push('ola_morada');
      if (party === 'vox') flags.push('ola_verde');
      if (party === 'sumar') flags.push('ola_sumar');
    }
  }

  const flagGain = success ? choice.setFlagsOk : choice.setFlagsFail;
  if (flagGain) {
    for (const f of flagGain) {
      if (!flags.includes(f)) flags.push(f);
    }
  }

  const toOffice = pickNextOffice(rng, { ...player, party, flags }, band, choice, intent);
  let next = applyQuality({ ...player, party, flags }, quality, toOffice, kind, rng);
  next = {
    ...next,
    office: toOffice,
    party,
    flags,
    year: pending.yearTo,
    age: 18 + Math.round(((pending.yearTo - 2008) / 22) * 22),
    turn: player.turn + 1,
    officesHeld: [...player.officesHeld, { year: pending.yearTo, office: toOffice, quality }],
    seenEventIds: [...player.seenEventIds, pending.event.id],
  };

  if (next.flags.includes('destino_naranja') && next.turn >= 8 && rng.chance(0.4)) {
    next.office = rng.pick(['tertuliano_nac', 'olvidado', 'memorias', 'influencer_top']);
  }

  const fromTier = getOffice(fromOffice).tier;
  const toTier = getOffice(next.office).tier;
  const valence =
    band === 'hold' ? valenceFromQuality(quality, fromTier, toTier) : valenceFromBand(band);

  const { reaction, support } = pickReaction(rng, {
    year: pending.yearFrom,
    party: next.party,
    personality: next.personality,
    valence,
    kind,
    choiceOk: choice.ok,
    choiceFail: choice.fail,
    success,
    seen: player.seenReactions,
  });

  const punch = support;
  const seenReactions = [...player.seenReactions];
  if (!seenReactions.includes(reaction)) seenReactions.push(reaction);

  const ratingBefore = player.rating;
  next = { ...next, rating: computeRating(next), seenReactions };

  const beat: TurnBeat = {
    yearFrom: pending.yearFrom,
    yearTo: pending.yearTo,
    fromOffice,
    toOffice: next.office,
    quality,
    band,
    punch,
    reaction,
    support,
    valence,
    headline: getOffice(next.office).title,
    detail: support,
    stim: [],
    choiceKind: kind,
    choiceLabel: choice.label,
    polls: pending.polls,
    partyAfter: next.party,
    ratingBefore,
    ratingAfter: next.rating,
  };

  return { player: next, beat };
}

export function isFinished(player: Player) {
  return player.turn >= player.totalTurns;
}
