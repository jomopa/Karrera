/**
 * Simulación offline para tunear diversidad safe/risk y anti-repeat.
 * Uso: npx tsx src/engine/sim.ts
 */
import { TOTAL_TURNS, TURN_YEARS, getOffice } from '../data/catalog';
import { ALL_EVENTS } from '../data/events';
import type { ChoiceKind, PartyId, PersonalityId, Player } from '../types';
import { buildPending, createPlayer, isFinished, resolveChoice } from './game';

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
): {
  events: string[];
  peak: number;
  moncloa: boolean;
  uniqueEvents: number;
  partyEnd: PartyId;
  flags: string[];
} {
  // Force distinct seeds via name salt
  let player: Player = createPlayer(`${name}_${salt}`, party, personality);
  // Override seed for reproducibility in batch
  player = { ...player, seed: (player.seed + salt * 9973) >>> 0 };

  const events: string[] = [];
  while (!isFinished(player)) {
    const pending = buildPending(player);
    events.push(pending.event.id);
    const kind = pickKind(policy, player.turn);
    const resolved = resolveChoice(player, pending, kind);
    player = resolved.player;
  }

  const peak = Math.max(...player.officesHeld.map((h) => getOffice(h.office).tier));
  return {
    events,
    peak,
    moncloa: player.officesHeld.some((h) => h.office === 'presidente'),
    uniqueEvents: new Set(events).size,
    partyEnd: player.party,
    flags: player.flags,
  };
}

function main() {
  const N = 48;
  console.log(`Karrera sim · ${ALL_EVENTS.length} events in pool · ${TURN_YEARS.length} turns\n`);

  for (const policy of KINDS) {
    const peaks: number[] = [];
    let moncloa = 0;
    let uniqueSum = 0;
    let repeats = 0;
    const eventHits = new Map<string, number>();

    for (let i = 0; i < N; i++) {
      const party = PARTIES[i % PARTIES.length]!;
      const persona = PERSONAS[i % PERSONAS.length]!;
      const r = runOnce('Sim', party, persona, policy, i + 1);
      peaks.push(r.peak);
      if (r.moncloa) moncloa++;
      uniqueSum += r.uniqueEvents;
      if (r.uniqueEvents < TOTAL_TURNS) repeats++;
      for (const id of r.events) eventHits.set(id, (eventHits.get(id) ?? 0) + 1);
    }

    const avgPeak = peaks.reduce((a, b) => a + b, 0) / peaks.length;
    const avgUnique = uniqueSum / N;
    console.log(`Policy: ${policy}`);
    console.log(`  avg peak tier: ${avgPeak.toFixed(2)}`);
    console.log(`  Moncloa rate: ${((moncloa / N) * 100).toFixed(1)}%`);
    console.log(`  avg unique events / run: ${avgUnique.toFixed(2)} / ${TOTAL_TURNS}`);
    console.log(`  runs with any event repeat: ${repeats}/${N}`);
    console.log(`  distinct events touched: ${eventHits.size}`);
    console.log('');
  }

  // Cross personality diversity: same party, different personas, mixed policy
  const sets = PERSONAS.map((p) => {
    const ids = new Set<string>();
    for (let i = 0; i < 12; i++) {
      runOnce('Div', 'psoe', p, 'mixed', 100 + i).events.forEach((e) => ids.add(e));
    }
    return ids;
  });
  const inter =
    [...sets[0]!].filter((e) => sets[1]!.has(e) && sets[2]!.has(e)).length;
  console.log(`Personality overlap (PSOE mixed, 12 runs each): shared events = ${inter}`);
  console.log('Done.');
}

main();
