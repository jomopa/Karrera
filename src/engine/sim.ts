/**
 * Simulación offline: mix de turnos + diversidad + distribución de techos.
 * Uso: npm run sim
 */
import { TURN_YEARS, getOffice } from '../data/catalog';
import { ALL_EVENTS } from '../data/events';
import { ALL_QUIZZES } from '../data/quiz';
import { SALA_CARDS } from '../data/sala';
import type { ChoiceKind, PartyId, PersonalityId, Player, TurnKind } from '../types';
import { buildPending, createPlayer, isFinished, resolveChoice } from './game';
import { buildPendingQuiz } from './quizPicker';
import { resolveQuiz } from './quizResolve';
import { buildPendingSala } from './salaPicker';
import { resolveSala } from './salaResolve';
import { buildTurnPlan, countKinds, turnKindOf } from './turnPlan';

const PARTIES: PartyId[] = ['psoe', 'pp', 'iu', 'upyd'];
const PERSONAS: PersonalityId[] = ['fontanero', 'atril', 'cruzado'];
type KindPolicy = ChoiceKind | 'mixed';
const KINDS: KindPolicy[] = ['safe', 'risk', 'mixed'];

function pickKind(policy: KindPolicy, turn: number): ChoiceKind {
  if (policy === 'mixed') return turn % 2 === 0 ? 'risk' : 'safe';
  return policy;
}

function runOnce(
  name: string,
  party: PartyId,
  personality: PersonalityId,
  policy: KindPolicy,
  salt: number,
  skillPerfect: boolean,
): {
  events: string[];
  quizzes: string[];
  salas: string[];
  kinds: TurnKind[];
  peak: number;
  moncloa: boolean;
  tier7: boolean;
  uniqueEvents: number;
  partyEnd: PartyId;
} {
  let player: Player = createPlayer(`${name}_${salt}`, party, personality);
  const seed = (player.seed + salt * 9973) >>> 0;
  player = { ...player, seed, turnPlan: buildTurnPlan(seed) };

  const events: string[] = [];
  const quizzes: string[] = [];
  const salas: string[] = [];
  const kinds: TurnKind[] = [...player.turnPlan];

  while (!isFinished(player)) {
    const kind = turnKindOf(player);
    if (kind === 'quiz') {
      const pending = buildPendingQuiz(player);
      quizzes.push(pending.question.id);
      const pick = skillPerfect ? pending.correctIndex : ((player.turn % 2) as 0 | 1);
      player = resolveQuiz(player, pending, pick).player;
    } else if (kind === 'sala') {
      const pending = buildPendingSala(player);
      salas.push(pending.card.id);
      const reading = skillPerfect
        ? pending.card.correct
        : (pending.card.options.find((o) => o !== pending.card.correct) ?? pending.card.options[0]!);
      player = resolveSala(player, pending, reading).player;
    } else {
      const pending = buildPending(player);
      events.push(pending.event.id);
      const choice = pickKind(policy, player.turn);
      player = resolveChoice(player, pending, choice).player;
    }
  }

  const peak = Math.max(...player.officesHeld.map((h) => getOffice(h.office).tier));
  return {
    events,
    quizzes,
    salas,
    kinds,
    peak,
    moncloa: player.officesHeld.some((h) => h.office === 'presidente'),
    tier7: peak >= 7,
    uniqueEvents: new Set(events).size,
    partyEnd: player.party,
  };
}

function hist(peaks: number[]): string {
  const buckets = [
    { label: '0-2', lo: 0, hi: 2 },
    { label: '3-4', lo: 3, hi: 4 },
    { label: '5-6', lo: 5, hi: 6 },
    { label: '7', lo: 7, hi: 7 },
    { label: '8', lo: 8, hi: 8 },
    { label: '9', lo: 9, hi: 9 },
  ];
  return buckets
    .map((b) => {
      const n = peaks.filter((p) => p >= b.lo && p <= b.hi).length;
      return `${b.label}:${((n / peaks.length) * 100).toFixed(0)}%`;
    })
    .join('  ');
}

function main() {
  const N = 120;
  console.log(
    `Karrera sim · ${ALL_EVENTS.length} events · ${ALL_QUIZZES.length} quizzes · ${SALA_CARDS.length} salas · ${TURN_YEARS.length} turns\n`,
  );

  let planOk = 0;
  for (let i = 0; i < 80; i++) {
    const p = createPlayer(`Plan_${i}`, 'psoe', 'fontanero');
    const c = countKinds(p.turnPlan);
    if (c.decision === 6 && c.quiz === 3 && c.sala === 3) planOk++;
  }
  console.log(`Turn plans 6/3/3: ${planOk}/80\n`);

  for (const policy of KINDS) {
    const peaks: number[] = [];
    let moncloa = 0;
    let tier7 = 0;
    let uniqueSum = 0;
    let quizSum = 0;
    let salaSum = 0;

    for (let i = 0; i < N; i++) {
      const party = PARTIES[i % PARTIES.length]!;
      const persona = PERSONAS[i % PERSONAS.length]!;
      const r = runOnce('Sim', party, persona, policy, i + 1, false);
      peaks.push(r.peak);
      if (r.moncloa) moncloa++;
      if (r.tier7) tier7++;
      uniqueSum += r.uniqueEvents;
      quizSum += r.quizzes.length;
      salaSum += r.salas.length;
    }

    const avgPeak = peaks.reduce((a, b) => a + b, 0) / peaks.length;
    console.log(`Policy: ${policy} (skill ~coin-flip)`);
    console.log(`  avg peak tier: ${avgPeak.toFixed(2)}`);
    console.log(`  peak hist: ${hist(peaks)}`);
    console.log(`  tier≥7: ${((tier7 / N) * 100).toFixed(1)}%  Moncloa: ${((moncloa / N) * 100).toFixed(1)}%`);
    console.log(
      `  avg unique decisions: ${(uniqueSum / N).toFixed(2)}/6 · quiz ${(quizSum / N).toFixed(1)} · sala ${(salaSum / N).toFixed(1)}`,
    );
    console.log('');
  }

  const peaksPerfect: number[] = [];
  let moncloaP = 0;
  for (let i = 0; i < N; i++) {
    const r = runOnce('Perf', PARTIES[i % 4]!, PERSONAS[i % 3]!, 'mixed', 500 + i, true);
    peaksPerfect.push(r.peak);
    if (r.moncloa) moncloaP++;
  }
  console.log('Perfect skill + mixed decisions:');
  console.log(`  avg peak: ${(peaksPerfect.reduce((a, b) => a + b, 0) / N).toFixed(2)}`);
  console.log(`  peak hist: ${hist(peaksPerfect)}`);
  console.log(`  Moncloa: ${((moncloaP / N) * 100).toFixed(1)}%`);
  console.log('Done.');
}

main();
