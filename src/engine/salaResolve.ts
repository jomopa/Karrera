import { computeRating } from '../data/feedback';
import { getOffice, TURN_YEARS } from '../data/catalog';
import { getSalaRule } from '../data/sala';
import type { ChoiceDef, PendingSala, Player, SalaBeat, SalaReading } from '../types';
import { applyQuality, pickNextOffice } from './game';
import { qualityFromBand, valenceFromBand } from './outcomes';
import { Rng } from './rng';

const SALA_OK: ChoiceDef = {
  kind: 'safe',
  label: 'lectura',
  hint: '',
  ok: 'Leíste la sala.',
  fail: '',
  advanceBias: 1,
};

const SALA_FAIL: ChoiceDef = {
  kind: 'safe',
  label: 'lectura',
  hint: '',
  ok: '',
  fail: 'Te comieron en la sala.',
  advanceBias: -1,
};

/**
 * Lectura de sala = skill check de turno completo.
 * Acierto: avance moderado (boom solo si resististe tentación).
 * Fallo: castigo real, con suelo suave al inicio.
 */
export function resolveSala(
  player: Player,
  pending: PendingSala,
  reading: SalaReading,
): { player: Player; beat: SalaBeat } {
  const { card } = pending;
  const rule = getSalaRule(card.ruleId);
  const correct = reading === card.correct;
  const noise = card.signals.find((s) => s.role === 'noise');
  const resistedTempt = correct && noise?.tempt === player.personality;

  const yearFrom = pending.yearFrom;
  const yearTo = TURN_YEARS[Math.min(player.turn + 1, TURN_YEARS.length - 1)] ?? 2030;
  const rng = new Rng(
    player.seed + player.turn * 211 + card.id.length * 37 + (correct ? 3 : 7) + yearFrom,
  );

  const band = correct
    ? resistedTempt
      ? 'boom'
      : rng.chance(0.4)
        ? 'win'
        : 'hold'
    : rng.chance(0.2)
      ? 'crash'
      : 'hurt';
  const quality = qualityFromBand(band);
  const intent = correct ? (band === 'hold' ? 'side' : 'up') : band === 'crash' ? 'scandalExit' : 'down';
  const choice = correct ? SALA_OK : SALA_FAIL;
  const fromOffice = player.office;

  let flags = [...player.flags];
  if (correct) {
    if (!flags.includes('sala_fria')) flags.push('sala_fria');
    const okFlag = `rule_${card.ruleId}_ok`;
    if (!flags.includes(okFlag)) flags.push(okFlag);
  } else if (!flags.includes('lectura_torpe')) {
    flags.push('lectura_torpe');
  }

  const staged: Player = { ...player, flags };
  const toOffice = pickNextOffice(rng, staged, band, choice, intent);
  let next = applyQuality(staged, quality, toOffice, 'safe', rng);
  next = {
    ...next,
    office: toOffice,
    year: yearTo,
    age: 18 + Math.round(((yearTo - 2008) / 22) * 22),
    turn: player.turn + 1,
    officesHeld: [...player.officesHeld, { year: yearTo, office: toOffice, quality }],
    seenSalaIds: player.seenSalaIds.includes(card.id)
      ? player.seenSalaIds
      : [...player.seenSalaIds, card.id],
    seenSalaRules: player.seenSalaRules.includes(card.ruleId)
      ? player.seenSalaRules
      : [...player.seenSalaRules, card.ruleId],
  };

  // Soft floor early: un fallo no te tira del tren al inicio
  if (!correct && player.turn < 4) {
    const fromTier = getOffice(fromOffice).tier;
    if (getOffice(next.office).tier < fromTier) {
      next = {
        ...next,
        office: fromOffice,
        officesHeld: [
          ...player.officesHeld,
          { year: yearTo, office: fromOffice, quality },
        ],
      };
    }
  }

  const ratingBefore = player.rating;
  let rating = computeRating(next);
  if (correct) rating = Math.min(99, rating + (resistedTempt ? 2 : 1));
  else rating = Math.max(48, rating - 2);
  next = { ...next, rating };

  const punch = correct
    ? resistedTempt
      ? `${rule.lessonOk} Resististe tu sesgo.`
      : rule.lessonOk
    : rule.lessonFail;

  const beat: SalaBeat = {
    cardId: card.id,
    ruleId: card.ruleId,
    correct,
    resistedTempt: !!resistedTempt,
    punch,
    lesson: rule.rule,
    reading,
    valence: valenceFromBand(band),
    yearFrom,
    yearTo,
    fromOffice,
    toOffice: next.office,
    quality,
    ratingBefore,
    ratingAfter: next.rating,
  };

  return { player: next, beat };
}
