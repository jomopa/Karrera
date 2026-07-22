import { getOffice, officeBand } from '../data/catalog';
import { SHADOW_OFFERS } from '../data/shadow';
import type { PendingShadow, Player, ShadowEra, ShadowOffer } from '../types';
import { Rng } from './rng';

const MAX_SHADOW_PER_CAREER = 3;

export function eraFromYear(year: number): ShadowEra {
  if (year <= 2011) return 'zap';
  if (year <= 2015) return 'rajoy';
  if (year <= 2018) return 'bloqueo';
  if (year <= 2023) return 'sanchez';
  return 'tarde';
}

function specificity(o: ShadowOffer): number {
  let s = 0;
  if (o.parties?.length) s += 4;
  if (o.bands?.length) s += 2;
  if (o.personalities?.length) s += 3;
  if (o.requireFlags?.length) s += 5;
  if (o.eras?.length) s += 2;
  return s;
}

function flagsOk(required: string[] | undefined, forbidden: string[] | undefined, flags: string[]): boolean {
  if (required?.some((f) => !flags.includes(f))) return false;
  if (forbidden?.some((f) => flags.includes(f))) return false;
  return true;
}

export function offerMatches(o: ShadowOffer, player: Player): boolean {
  const band = officeBand(getOffice(player.office).tier);
  const era = eraFromYear(player.year);
  if (o.parties && !o.parties.includes(player.party)) return false;
  if (o.bands && !o.bands.includes(band)) return false;
  if (o.personalities && !o.personalities.includes(player.personality)) return false;
  if (o.eras && !o.eras.includes(era)) return false;
  if (!flagsOk(o.requireFlags, o.forbidFlags, player.flags)) return false;
  return true;
}

/** ~28% base desde turno 2; máx 3/carrera; no si cooldown; ética/sombra/personalidad modulan. */
export function shouldPresentShadow(player: Player): boolean {
  if (player.turn < 2) return false;
  if (player.shadowCooldown) return false;
  if (player.shadowCount >= MAX_SHADOW_PER_CAREER) return false;

  const rng = new Rng(player.seed + player.turn * 911 + player.shadowCount * 47 + 13);
  let p = 0.28;
  p += (player.sombra - 40) * 0.0025;
  p += (50 - player.etica) * 0.002;
  if (player.personality === 'cruzado') p *= 0.55;
  if (player.personality === 'fontanero') p *= 1.15;
  if (player.flags.includes('sombra_quema')) p *= 0.7;
  if (player.flags.includes('sombra_ok')) p *= 1.1;
  p = Math.max(0.08, Math.min(0.42, p));
  return rng.chance(p);
}

export function rollPendingShadow(player: Player): PendingShadow | null {
  const matched = SHADOW_OFFERS.filter(
    (o) => offerMatches(o, player) && !player.seenShadowIds.includes(o.id),
  );
  const pool = matched.length
    ? matched
    : SHADOW_OFFERS.filter((o) => offerMatches(o, player));
  if (!pool.length) return null;

  const rng = new Rng(player.seed + player.turn * 733 + player.rating * 3 + player.shadowCount * 19);
  const topSpec = Math.max(...pool.map(specificity));
  const best = pool.filter((o) => specificity(o) === topSpec);
  const use = best.length ? best : pool;

  const weighted = use.map((o) => {
    let w = (o.weight ?? 10) + specificity(o);
    if (o.personalities?.includes(player.personality)) w *= 1.5;
    if (o.parties?.includes(player.party)) w *= 1.3;
    if (o.requireFlags?.every((f) => player.flags.includes(f))) w *= 1.7;
    return { offer: o, weight: Math.max(0.01, w) };
  });

  const picked = rng.weighted(weighted).offer;
  const win = rng.chance(0.7);
  return { offer: picked, win };
}
