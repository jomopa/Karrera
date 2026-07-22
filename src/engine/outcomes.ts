import type { ChoiceDef, ChoiceKind, OutcomeBand, Player, Quality } from '../types';
import type { Rng } from './rng';

const BAND_TO_QUALITY: Record<OutcomeBand, Quality> = {
  boom: 'excelente',
  win: 'bien',
  hold: 'tirando',
  hurt: 'mal',
  crash: 'escandalo',
};

/** Tablas asimétricas: safe = suelo alto / techo bajo; risk = volátil */
const SAFE_TABLE: { band: OutcomeBand; weight: number }[] = [
  { band: 'boom', weight: 4 },
  { band: 'win', weight: 28 },
  { band: 'hold', weight: 52 },
  { band: 'hurt', weight: 14 },
  { band: 'crash', weight: 2 },
];

const RISK_TABLE: { band: OutcomeBand; weight: number }[] = [
  { band: 'boom', weight: 18 },
  { band: 'win', weight: 24 },
  { band: 'hold', weight: 22 },
  { band: 'hurt', weight: 20 },
  { band: 'crash', weight: 16 },
];

export function rollOutcomeBand(rng: Rng, player: Player, choice: ChoiceDef): OutcomeBand {
  const base = choice.kind === 'safe' ? SAFE_TABLE : RISK_TABLE;
  const bias = choice.advanceBias;
  const formaMod = (player.forma - 50) * 0.08;
  const sombraMod = player.sombra * 0.04;

  const table = base.map((row) => {
    let w = row.weight;
    if (row.band === 'boom' || row.band === 'win') w += bias * 3 + formaMod;
    if (row.band === 'hurt' || row.band === 'crash') w += Math.max(0, -bias) * 2 + sombraMod * 0.5;
    if (choice.kind === 'safe' && row.band === 'hold') w += 4;
    if (choice.kind === 'risk' && (row.band === 'boom' || row.band === 'crash')) w += Math.max(0, bias);
    // Ciudadanos tarde: más dolor
    if (player.party === 'ciudadanos' && player.turn >= 7 && (row.band === 'hurt' || row.band === 'crash')) {
      w += 10;
    }
    return { band: row.band, weight: Math.max(0.5, w) };
  });

  return rng.weighted(table).band;
}

export function qualityFromBand(band: OutcomeBand): Quality {
  return BAND_TO_QUALITY[band];
}

export function isSuccessBand(band: OutcomeBand, rng: Rng): boolean {
  if (band === 'boom' || band === 'win') return true;
  if (band === 'hurt' || band === 'crash') return false;
  return rng.chance(0.55);
}

export function intentFromBand(
  band: OutcomeBand,
  kind: ChoiceKind,
): 'up' | 'side' | 'down' | 'scandalExit' {
  switch (band) {
    case 'boom':
      return 'up';
    case 'win':
      return kind === 'risk' ? 'up' : 'side';
    case 'hold':
      return 'side';
    case 'hurt':
      return 'down';
    case 'crash':
      return 'scandalExit';
  }
}

export function valenceFromBand(band: OutcomeBand): 'up' | 'flat' | 'down' {
  if (band === 'boom' || band === 'win') return 'up';
  if (band === 'hurt' || band === 'crash') return 'down';
  return 'flat';
}
