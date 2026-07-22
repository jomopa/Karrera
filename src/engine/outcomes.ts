import type { ChoiceDef, ChoiceKind, OutcomeBand, Player, Quality } from '../types';
import { getOffice } from '../data/catalog';
import type { Rng } from './rng';

const BAND_TO_QUALITY: Record<OutcomeBand, Quality> = {
  boom: 'excelente',
  win: 'bien',
  hold: 'tirando',
  hurt: 'mal',
  crash: 'escandalo',
};

/**
 * Safe = suelo alto / techo bajo (carrera estable).
 * Risk = volátil: camino a lo brillante y al precipicio.
 */
const SAFE_TABLE: { band: OutcomeBand; weight: number }[] = [
  { band: 'boom', weight: 3 },
  { band: 'win', weight: 26 },
  { band: 'hold', weight: 54 },
  { band: 'hurt', weight: 15 },
  { band: 'crash', weight: 2 },
];

const RISK_TABLE: { band: OutcomeBand; weight: number }[] = [
  { band: 'boom', weight: 16 },
  { band: 'win', weight: 22 },
  { band: 'hold', weight: 20 },
  { band: 'hurt', weight: 22 },
  { band: 'crash', weight: 20 },
];

export function rollOutcomeBand(rng: Rng, player: Player, choice: ChoiceDef): OutcomeBand {
  const base = choice.kind === 'safe' ? SAFE_TABLE : RISK_TABLE;
  const bias = choice.advanceBias;
  const formaMod = (player.forma - 50) * 0.07;
  const sombraMod = player.sombra * 0.045;
  const tier = getOffice(player.office).tier;
  // A más altura, menos boom "gratis" y más hurt (castigo del poder)
  const heightTax = Math.max(0, tier - 5) * 1.6;

  const table = base.map((row) => {
    let w = row.weight;
    if (row.band === 'boom' || row.band === 'win') w += bias * 2.8 + formaMod - heightTax * 0.45;
    if (row.band === 'hurt' || row.band === 'crash') {
      w += Math.max(0, -bias) * 2 + sombraMod * 0.5 + heightTax * 0.3;
    }
    if (choice.kind === 'safe' && row.band === 'hold') w += 5;
    if (choice.kind === 'risk' && (row.band === 'boom' || row.band === 'crash')) {
      w += Math.max(0, bias) * 0.9;
    }
    // Ciudadanos tarde: más dolor
    if (player.party === 'ciudadanos' && player.turn >= 7 && (row.band === 'hurt' || row.band === 'crash')) {
      w += 10;
    }
    if (tier >= 7 && row.band === 'crash') w += 3;
    if (tier >= 8 && row.band === 'boom') w *= 0.82;
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
  return rng.chance(0.5);
}

export function intentFromBand(
  band: OutcomeBand,
  kind: ChoiceKind,
): 'up' | 'side' | 'down' | 'scandalExit' {
  switch (band) {
    case 'boom':
      return 'up';
    case 'win':
      // Safe win = lateral/consolidar; risk win = empujar arriba
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
