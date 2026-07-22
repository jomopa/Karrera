import { getOffice, officeBand, TURN_YEARS } from '../data/catalog';
import { SALA_CARDS } from '../data/sala';
import type { PendingSala, Player, SalaCard, SalaSignal, ShadowEra } from '../types';
import { eraFromYear } from './shadowPicker';
import { turnKindOf } from './turnPlan';
import { Rng } from './rng';

export function isSalaTurn(player: Player): boolean {
  return turnKindOf(player) === 'sala';
}

export function shouldPresentSala(player: Player): boolean {
  if (player.retired) return false;
  return isSalaTurn(player);
}

function flagsOk(card: SalaCard, flags: string[]): boolean {
  if (card.requireFlags?.some((f) => !flags.includes(f))) return false;
  if (card.forbidFlags?.some((f) => flags.includes(f))) return false;
  return true;
}

function cardMatches(card: SalaCard, player: Player, era: ShadowEra): boolean {
  if (!card.eras.includes(era)) return false;
  if (card.parties && !card.parties.includes(player.party)) return false;
  const band = officeBand(getOffice(player.office).tier);
  if (card.bands && !card.bands.includes(band)) return false;
  if (!flagsOk(card, player.flags)) return false;
  return true;
}

function shuffleSignals(rng: Rng, signals: SalaCard['signals']): [SalaSignal, SalaSignal, SalaSignal] {
  const arr = [...signals];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return [arr[0]!, arr[1]!, arr[2]!];
}

export function pickSalaCard(player: Player): SalaCard {
  const year = TURN_YEARS[player.turn] ?? player.year;
  const era = eraFromYear(year);
  const rng = new Rng(player.seed + player.turn * 701 + player.seenSalaIds.length * 29 + 4409);

  const pool = SALA_CARDS.filter((c) => cardMatches(c, player, era));
  const fallback = SALA_CARDS.filter((c) => c.eras.includes(era));
  const base = pool.length ? pool : fallback.length ? fallback : SALA_CARDS;

  const unseen = base.filter((c) => !player.seenSalaIds.includes(c.id));
  let candidates = unseen.length ? unseen : base;

  // Prefer rules not yet seen this run
  const freshRule = candidates.filter((c) => !player.seenSalaRules.includes(c.ruleId));
  if (freshRule.length) candidates = freshRule;

  const weighted = candidates.map((c) => {
    let w = c.weight ?? 10;
    if (player.seenSalaIds.includes(c.id)) w *= 0.05;
    if (player.seenSalaRules.includes(c.ruleId)) w *= 0.55;
    if (c.signals.some((s) => s.tempt === player.personality)) w *= 1.15;
    return { ...c, weight: Math.max(0.01, w) };
  });

  return rng.weighted(weighted);
}

export function buildPendingSala(player: Player): PendingSala {
  const card = pickSalaCard(player);
  const yearFrom = TURN_YEARS[player.turn] ?? player.year;
  const rng = new Rng(player.seed + card.id.length * 41 + player.turn * 17);
  return {
    card,
    signals: shuffleSignals(rng, card.signals),
    yearFrom,
  };
}
