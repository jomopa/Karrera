import { getOffice, officeBand } from '../data/catalog';
import { getPersonality } from '../data/personalities';
import { EVENTS_BY_YEAR } from '../data/events';
import type { EventVariant, Player, YearEvent } from '../types';
import { Rng } from './rng';

function specificity(v: EventVariant): number {
  let s = 0;
  if (v.parties?.length) s += 4;
  if (v.bands?.length) s += 2;
  if (v.personalities?.length) s += 3;
  if (v.requireFlags?.length) s += 5;
  return s;
}

function flagsOk(required: string[] | undefined, forbidden: string[] | undefined, flags: string[]): boolean {
  if (required?.some((f) => !flags.includes(f))) return false;
  if (forbidden?.some((f) => flags.includes(f))) return false;
  return true;
}

function variantMatches(v: EventVariant, player: Player): boolean {
  const band = officeBand(getOffice(player.office).tier);
  if (v.parties && !v.parties.includes(player.party)) return false;
  if (v.bands && !v.bands.includes(band)) return false;
  if (v.personalities && !v.personalities.includes(player.personality)) return false;
  if (!flagsOk(v.requireFlags, v.forbidFlags, player.flags)) return false;
  return true;
}

function eventPlayable(event: YearEvent, player: Player): boolean {
  if (!flagsOk(event.requireFlags, event.forbidFlags, player.flags)) return false;
  return event.variants.some((v) => variantMatches(v, player));
}

export function pickEvent(player: Player, year: number): YearEvent {
  const pool = (EVENTS_BY_YEAR[year] ?? []).filter((e) => eventPlayable(e, player));
  const fallback = (EVENTS_BY_YEAR[year] ?? []).filter((e) =>
    e.variants.some((v) => {
      const band = officeBand(getOffice(player.office).tier);
      if (v.parties && !v.parties.includes(player.party)) return false;
      if (v.bands && !v.bands.includes(band)) return false;
      return true;
    }),
  );
  const list = pool.length ? pool : fallback.length ? fallback : (EVENTS_BY_YEAR[year] ?? []);
  const rng = new Rng(player.seed + year * 997 + player.turn * 131 + player.personality.length * 17);

  const unseen = list.filter((e) => !player.seenEventIds.includes(e.id));
  const candidates = unseen.length ? unseen : list;

  const weighted = candidates.map((e) => {
    let w = e.weight ?? 10;
    if (player.seenEventIds.includes(e.id)) w *= 0.05;
    if (e.variants.some((v) => v.personalities?.includes(player.personality) && variantMatches(v, player))) {
      w *= 1.35;
    }
    if (e.variants.some((v) => v.requireFlags?.some((f) => player.flags.includes(f)))) {
      w *= 1.6;
    }
    return { e, weight: Math.max(0.01, w) };
  });

  return rng.weighted(weighted.map((x) => ({ ...x.e, weight: x.weight })));
}

export function pickVariant(event: YearEvent, player: Player): EventVariant {
  const rng = new Rng(player.seed + event.id.length * 41 + player.turn * 19 + player.rating);
  const matched = event.variants.filter((v) => variantMatches(v, player));
  const pool = matched.length ? matched : event.variants;

  // Ponderar todo el pool jugable (no quedarse solo en máxima especificidad)
  const weighted = pool.map((v) => {
    let w = 2 + specificity(v);
    if (v.personalities?.includes(player.personality)) w *= 1.6;
    if (v.parties?.includes(player.party)) w *= 1.25;
    if (v.requireFlags?.every((f) => player.flags.includes(f))) w *= 1.8;
    return { ...v, weight: w };
  });

  return rng.weighted(weighted);
}

/** Soft bias de oficinas según personalidad */
export function personalityOfficeBias(player: Player, toOffice: string): number {
  const p = getPersonality(player.personality);
  const office = getOffice(toOffice);
  let m = 1;
  if (p.favorOffices.includes(toOffice)) m *= 1.55;
  if (p.favorBranches.includes(office.branch)) m *= 1.25;
  if (player.personality === 'cruzado' && (toOffice.includes('activista') || toOffice === 'guru')) m *= 1.2;
  if (player.personality === 'atril' && office.branch === 'organica') m *= 0.75;
  if (player.personality === 'fontanero' && office.branch === 'media') m *= 0.8;
  return m;
}
