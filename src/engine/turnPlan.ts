import { TOTAL_TURNS } from '../data/catalog';
import type { Player, TurnKind } from '../types';
import { Rng } from './rng';

/** Mix fijo por carrera: 6 decisiones + 3 quiz + 3 lecturas de sala. */
const CAREER_MIX: TurnKind[] = [
  'decision',
  'decision',
  'decision',
  'decision',
  'decision',
  'decision',
  'quiz',
  'quiz',
  'quiz',
  'sala',
  'sala',
  'sala',
];

function shuffleInPlace<T>(rng: Rng, arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/**
 * Puntuación de pacing: aleatorio sí, pero con ritmo de juego.
 * - Arrancar con decisión (enseñar el loop seguro/riesgo)
 * - No encadenar dos skill-checks iguales
 * - Repartir quiz y sala en tercios de carrera
 * - Evitar tres decisiones seguidas al final (clímax plano)
 */
function scorePlan(plan: TurnKind[]): number {
  let s = 0;
  if (plan[0] === 'decision') s += 14;
  if (plan[1] === 'decision') s += 4;

  for (let i = 1; i < plan.length; i++) {
    const a = plan[i - 1]!;
    const b = plan[i]!;
    if (a === b && a !== 'decision') s -= 18;
    if (a !== 'decision' && b !== 'decision' && a !== b) s -= 4; // quiz→sala duro
    if (a === 'decision' && b === 'decision') s -= 0.5;
  }

  const thirds = [
    plan.slice(0, 4),
    plan.slice(4, 8),
    plan.slice(8, 12),
  ];
  for (const kind of ['quiz', 'sala'] as const) {
    const hits = thirds.map((t) => t.filter((k) => k === kind).length);
    // Ideal: 1 por tercio
    for (const h of hits) {
      if (h === 1) s += 6;
      else if (h === 0) s -= 5;
      else s -= 8;
    }
  }

  // Último tercio: al menos una decisión (elección climática)
  if (thirds[2]!.some((k) => k === 'decision')) s += 5;
  // Primera mitad: al menos una skill check (variedad temprana)
  if (plan.slice(0, 6).some((k) => k !== 'decision')) s += 4;

  return s;
}

/** Genera el calendario de 12 rondas para una partida (determinista por seed). */
export function buildTurnPlan(seed: number): TurnKind[] {
  const rng = new Rng((seed ^ 0x51a1a) >>> 0 || 1);
  let best = [...CAREER_MIX];
  let bestScore = -Infinity;

  for (let attempt = 0; attempt < 48; attempt++) {
    const plan = shuffleInPlace(rng, [...CAREER_MIX]);
    const score = scorePlan(plan);
    if (score > bestScore) {
      bestScore = score;
      best = plan;
    }
  }

  if (best.length !== TOTAL_TURNS) {
    throw new Error(`turnPlan length ${best.length} !== ${TOTAL_TURNS}`);
  }
  return best;
}

export function turnKindOf(player: Player): TurnKind {
  return player.turnPlan[player.turn] ?? 'decision';
}

export function countKinds(plan: TurnKind[]): Record<TurnKind, number> {
  return {
    decision: plan.filter((k) => k === 'decision').length,
    quiz: plan.filter((k) => k === 'quiz').length,
    sala: plan.filter((k) => k === 'sala').length,
  };
}
