import { ALL_QUIZZES } from '../data/quiz';
import { pollsFor } from '../data/polls';
import type { PendingQuiz, Player, QuizQuestion, ShadowEra } from '../types';
import { TURN_YEARS } from '../data/catalog';
import { eraFromYear } from './shadowPicker';
import { turnKindOf } from './turnPlan';
import { Rng } from './rng';

const ERA_ORDER: ShadowEra[] = ['zap', 'rajoy', 'bloqueo', 'sanchez', 'tarde'];

export function isQuizTurn(player: Player): boolean {
  return turnKindOf(player) === 'quiz';
}

function adjacentEras(era: ShadowEra): ShadowEra[] {
  const i = ERA_ORDER.indexOf(era);
  const out: ShadowEra[] = [era];
  if (i > 0) out.push(ERA_ORDER[i - 1]!);
  if (i < ERA_ORDER.length - 1) out.push(ERA_ORDER[i + 1]!);
  return out;
}

function inEras(q: QuizQuestion, eras: ShadowEra[]): boolean {
  return q.eras.some((e) => eras.includes(e));
}

export function pickQuiz(player: Player, year: number): QuizQuestion {
  const era = eraFromYear(year);
  const rng = new Rng(player.seed + year * 881 + player.turn * 47 + player.seenQuizIds.length * 13);

  const tryPools: ShadowEra[][] = [
    [era],
    adjacentEras(era),
    ERA_ORDER,
  ];

  for (const eras of tryPools) {
    const pool = ALL_QUIZZES.filter((q) => inEras(q, eras));
    const unseen = pool.filter((q) => !player.seenQuizIds.includes(q.id));
    const candidates = unseen.length ? unseen : pool;
    if (candidates.length) return rng.pick(candidates);
  }

  return rng.pick(ALL_QUIZZES);
}

export function buildPendingQuiz(player: Player): PendingQuiz {
  const yearFrom = TURN_YEARS[player.turn] ?? player.year;
  const yearTo = TURN_YEARS[Math.min(player.turn + 1, TURN_YEARS.length - 1)] ?? 2030;
  const question = pickQuiz(player, yearFrom);
  const rng = new Rng(
    player.seed + question.id.length * 59 + player.turn * 101 + yearFrom * 7,
  );
  const correctFirst = rng.chance(0.5);
  const options: [string, string] = correctFirst
    ? [question.correct, question.wrong]
    : [question.wrong, question.correct];
  const correctIndex: 0 | 1 = correctFirst ? 0 : 1;
  return {
    question,
    options,
    correctIndex,
    polls: pollsFor(yearFrom),
    yearFrom,
    yearTo,
  };
}
