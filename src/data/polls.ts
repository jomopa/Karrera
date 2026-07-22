import type { PartyId, PollRow } from '../types';

/** Sondeos / resultados aproximados del mapa real (top 4 del momento). */
export const POLLS_BY_YEAR: Record<number, PollRow[]> = {
  2008: [
    { party: 'psoe', pct: 43.9 },
    { party: 'pp', pct: 39.9 },
    { party: 'iu', pct: 3.8 },
    { party: 'upyd', pct: 1.2 },
  ],
  2010: [
    { party: 'pp', pct: 42.0 },
    { party: 'psoe', pct: 34.0 },
    { party: 'iu', pct: 5.5 },
    { party: 'upyd', pct: 3.0 },
  ],
  2011: [
    { party: 'pp', pct: 44.6 },
    { party: 'psoe', pct: 28.8 },
    { party: 'iu', pct: 6.9 },
    { party: 'upyd', pct: 4.7 },
  ],
  2012: [
    { party: 'pp', pct: 42.0 },
    { party: 'psoe', pct: 28.0 },
    { party: 'iu', pct: 8.0 },
    { party: 'upyd', pct: 5.5 },
  ],
  2014: [
    { party: 'pp', pct: 26.0 },
    { party: 'psoe', pct: 23.0 },
    { party: 'podemos', pct: 18.0 },
    { party: 'upyd', pct: 6.5 },
  ],
  2015: [
    { party: 'pp', pct: 28.7 },
    { party: 'psoe', pct: 22.0 },
    { party: 'podemos', pct: 20.7 },
    { party: 'ciudadanos', pct: 13.9 },
  ],
  2017: [
    { party: 'pp', pct: 28.0 },
    { party: 'psoe', pct: 24.0 },
    { party: 'podemos', pct: 17.0 },
    { party: 'ciudadanos', pct: 16.0 },
  ],
  2018: [
    { party: 'psoe', pct: 27.0 },
    { party: 'pp', pct: 22.0 },
    { party: 'ciudadanos', pct: 18.0 },
    { party: 'podemos', pct: 16.0 },
  ],
  2020: [
    { party: 'psoe', pct: 28.0 },
    { party: 'pp', pct: 22.0 },
    { party: 'vox', pct: 15.0 },
    { party: 'podemos', pct: 12.0 },
  ],
  2023: [
    { party: 'pp', pct: 33.1 },
    { party: 'psoe', pct: 31.7 },
    { party: 'vox', pct: 12.4 },
    { party: 'sumar', pct: 12.3 },
  ],
  2026: [
    { party: 'pp', pct: 32.0 },
    { party: 'psoe', pct: 30.0 },
    { party: 'vox', pct: 14.0 },
    { party: 'sumar', pct: 11.0 },
  ],
  2030: [
    { party: 'psoe', pct: 31.0 },
    { party: 'pp', pct: 30.0 },
    { party: 'vox', pct: 13.0 },
    { party: 'sumar', pct: 12.0 },
  ],
};

export function pollsFor(year: number): PollRow[] {
  const keys = Object.keys(POLLS_BY_YEAR)
    .map(Number)
    .sort((a, b) => a - b);
  let best = keys[0]!;
  for (const k of keys) {
    if (k <= year) best = k;
  }
  return POLLS_BY_YEAR[best] ?? [];
}

export function partyShort(id: PartyId) {
  const map: Record<PartyId, string> = {
    psoe: 'PSOE',
    pp: 'PP',
    iu: 'IU',
    upyd: 'UPyD',
    podemos: 'Podemos',
    ciudadanos: 'Cs',
    vox: 'Vox',
    sumar: 'Sumar',
  };
  return map[id];
}
