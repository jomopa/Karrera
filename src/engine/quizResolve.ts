import { computeRating } from '../data/feedback';
import { getOffice } from '../data/catalog';
import type { ChoiceDef, PendingQuiz, Player, TurnBeat } from '../types';
import { applyQuality, pickNextOffice } from './game';
import { qualityFromBand, valenceFromBand } from './outcomes';
import { Rng } from './rng';

const QUIZ_OK: ChoiceDef = {
  kind: 'safe',
  label: 'hemeroteca',
  hint: '',
  ok: 'Sabías la hemeroteca.',
  fail: '',
  advanceBias: 1,
};

const QUIZ_FAIL: ChoiceDef = {
  kind: 'safe',
  label: 'hemeroteca',
  hint: '',
  ok: '',
  fail: 'Te pilló el truco de tertulia.',
  advanceBias: -1,
};

const OK_PUNCHES = [
  'Sabías la hemeroteca. En el pasillo eso vale más que un mitin.',
  'Respuesta limpia. Un veterano anota tu nombre sin decirlo.',
  'Acertaste. La cultura política no se improvisa en el atril.',
  'Bingo de hemeroteca. Subes un peldaño sin pedir permiso.',
];

const FAIL_PUNCHES = [
  'Te pilló el truco de tertulia. La hemeroteca no perdona.',
  'Fallaste. En política, no saber duele más que no hablar.',
  'Respuesta torcida. Alguien sonríe: «Otro que no lee».',
  'La opción fácil… y equivocada. Tu currículum tiembla un poco.',
];

export function resolveQuiz(
  player: Player,
  pending: PendingQuiz,
  optionIndex: 0 | 1,
): { player: Player; beat: TurnBeat } {
  const correct = optionIndex === pending.correctIndex;
  const rng = new Rng(
    player.seed +
      player.turn * 149 +
      pending.question.id.length * 23 +
      optionIndex * 11 +
      pending.yearFrom,
  );

  // Acierto: avance moderado (no catapulta). Fallo: castigo real.
  const band = correct
    ? rng.chance(0.22)
      ? 'boom'
      : rng.chance(0.55)
        ? 'win'
        : 'hold'
    : rng.chance(0.18)
      ? 'crash'
      : 'hurt';
  const quality = qualityFromBand(band);
  const intent = correct ? (band === 'hold' ? 'side' : 'up') : band === 'crash' ? 'scandalExit' : 'down';
  const choice = correct ? QUIZ_OK : QUIZ_FAIL;
  const fromOffice = player.office;

  const toOffice = pickNextOffice(rng, player, band, choice, intent);
  let next = applyQuality(player, quality, toOffice, 'safe', rng);
  next = {
    ...next,
    office: toOffice,
    year: pending.yearTo,
    age: 18 + Math.round(((pending.yearTo - 2008) / 22) * 22),
    turn: player.turn + 1,
    officesHeld: [...player.officesHeld, { year: pending.yearTo, office: toOffice, quality }],
    seenQuizIds: [...player.seenQuizIds, pending.question.id],
  };

  // Soft floor temprano: un fallo de hemeroteca no te hunde al inicio
  if (!correct && player.turn < 4) {
    const fromTier = getOffice(fromOffice).tier;
    if (getOffice(next.office).tier < fromTier) {
      next = { ...next, office: fromOffice };
      next.officesHeld = [
        ...player.officesHeld,
        { year: pending.yearTo, office: fromOffice, quality },
      ];
    }
  }

  const valence = valenceFromBand(band);
  const punches = correct ? OK_PUNCHES : FAIL_PUNCHES;
  const punch = rng.pick(punches);
  const label = pending.options[optionIndex] ?? '';

  const ratingBefore = player.rating;
  next = { ...next, rating: computeRating(next) };

  const beat: TurnBeat = {
    yearFrom: pending.yearFrom,
    yearTo: pending.yearTo,
    fromOffice,
    toOffice: next.office,
    quality,
    band,
    punch,
    reaction: punch,
    support: punch,
    valence,
    headline: getOffice(next.office).title,
    detail: punch,
    stim: ['Quiz'],
    choiceKind: 'safe',
    choiceLabel: label,
    polls: pending.polls,
    partyAfter: next.party,
    ratingBefore,
    ratingAfter: next.rating,
  };

  return { player: next, beat };
}
