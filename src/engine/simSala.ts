/**
 * Sim Lectura de sala: cobertura + skill vs ruido.
 * Uso: npm run sim:sala
 */
import { SALA_CARDS, SALA_RULES } from '../data/sala';
import type { PersonalityId, Player, SalaCard, SalaReading } from '../types';
import { createPlayer } from './game';
import { buildPendingSala, pickSalaCard } from './salaPicker';
import { resolveSala } from './salaResolve';
import { buildTurnPlan } from './turnPlan';

function perfectReading(card: SalaCard): SalaReading {
  return card.correct;
}

function noiseReading(card: SalaCard, personality: PersonalityId): SalaReading {
  const tempt = card.signals.find((s) => s.role === 'noise' && s.tempt === personality);
  if (tempt) {
    return card.options.find((o) => o !== card.correct) ?? card.options[0]!;
  }
  return card.options.find((o) => o !== card.correct) ?? card.options[0]!;
}

function main() {
  console.log(`Sala bank: ${SALA_CARDS.length} cards · ${SALA_RULES.length} rules\n`);

  const ruleHits = new Map<string, number>();
  let perfectOk = 0;
  let noiseOk = 0;
  const N = 200;

  for (let i = 0; i < N; i++) {
    let player: Player = createPlayer(`SalaSim_${i}`, 'psoe', (['fontanero', 'atril', 'cruzado'] as const)[i % 3]!);
    const seed = (player.seed + i * 7919) >>> 0;
    const plan = buildTurnPlan(seed);
    const salaTurn = plan.findIndex((k) => k === 'sala');
    player = { ...player, seed, turnPlan: plan, turn: salaTurn >= 0 ? salaTurn : 3 };

    const card = pickSalaCard(player);
    ruleHits.set(card.ruleId, (ruleHits.get(card.ruleId) ?? 0) + 1);

    const pending = buildPendingSala(player);
    const forced = { ...pending, card };

    const pRead = perfectReading(card);
    const nRead = noiseReading(card, player.personality);

    if (resolveSala(player, forced, pRead).beat.correct) perfectOk++;
    if (resolveSala(player, forced, nRead).beat.correct) noiseOk++;
  }

  console.log('Rule coverage in 200 picks:');
  for (const r of SALA_RULES) {
    console.log(`  ${r.id}: ${ruleHits.get(r.id) ?? 0}`);
  }
  console.log(`\nPerfect reader accuracy: ${((perfectOk / N) * 100).toFixed(1)}% (expect 100)`);
  console.log(`Noise follower accuracy: ${((noiseOk / N) * 100).toFixed(1)}% (expect low)`);
  console.log('Done.');
}

main();
