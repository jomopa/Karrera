import type { OfficeId, Player } from '../types';
import { getOffice } from '../data/catalog';

/** Sueldos anuales aproximados (€) — órdenes de magnitud realistas España. */
export const OFFICE_SALARY: Record<string, number> = {
  estudiante: 0,
  activista: 0,
  funcionario: 28000,
  abogado: 36000,
  profesor: 32000,
  empresario: 45000,
  periodista: 26000,
  influencer_civil: 18000,
  sindicalista: 30000,
  asesor_privado: 42000,
  becario: 14000,
  tertuliano_local: 22000,
  militante: 0,
  juventudes: 0,
  responsable_local: 16000,
  asesor_municipal: 28000,
  jefe_gabinete_local: 38000,
  tecnico_partido: 26000,
  portavoz_juvenil: 20000,
  concejal_op: 24000,
  concejal_gob: 32000,
  concejal_urbanismo: 36000,
  concejal_hacienda: 38000,
  concejal_cultura: 34000,
  teniente_alcalde: 48000,
  portavoz_municipal: 42000,
  alcalde_pueblo: 42000,
  alcalde_medio: 65000,
  alcalde_grande: 95000,
  diputacion: 78000,
  diputado_aut: 62000,
  portavoz_aut: 72000,
  consejero: 85000,
  vp_aut: 95000,
  pres_aut: 110000,
  diputado: 86000,
  senador: 82000,
  portavoz_adjunto: 92000,
  sec_organizacion: 70000,
  sec_general: 75000,
  portavoz_parl: 98000,
  secretario_estado: 90000,
  ministro: 120000,
  vicepresidente: 140000,
  presidente: 160000,
  eurodiputado: 120000,
  vp_pe: 140000,
  comisario: 250000,
  alto_ue: 220000,
  fontanero: 55000,
  responsable_territorial: 48000,
  jefe_estrategia: 60000,
  dir_campana: 65000,
  numero_dos: 70000,
  baron: 80000,
  guru: 55000,
  analista: 45000,
  tertuliano_nac: 90000,
  thinktank: 70000,
  influencer_top: 80000,
  presentador: 150000,
  memorias: 40000,
  expresidente: 90000,
  conferenciante: 120000,
  consejero_empresa: 180000,
  profesor_uni: 45000,
  fundacion: 60000,
  olvidado: 18000,
};

export interface Patrimony {
  salaries: number;
  underTable: number;
  total: number;
  ethicsNote: string;
  joke: string;
  peakOffice: OfficeId;
  peakTitle: string;
}

function yearsInOfficeApprox(player: Player): Map<OfficeId, number> {
  const map = new Map<OfficeId, number>();
  const held = player.officesHeld;
  for (let i = 0; i < held.length; i++) {
    const cur = held[i]!;
    const nextYear = held[i + 1]?.year ?? player.year;
    const span = Math.max(1, nextYear - cur.year);
    map.set(cur.office, (map.get(cur.office) ?? 0) + span);
  }
  return map;
}

export function peakOffice(player: Player): { id: OfficeId; title: string; tier: number } {
  let best = { id: player.office, title: getOffice(player.office).title, tier: getOffice(player.office).tier };
  for (const h of player.officesHeld) {
    const o = getOffice(h.office);
    if (o.tier > best.tier) best = { id: h.office, title: o.title, tier: o.tier };
  }
  return best;
}

export function computePatrimony(player: Player): Patrimony {
  const years = yearsInOfficeApprox(player);
  let salaries = 0;
  for (const [office, y] of years) {
    const annual = OFFICE_SALARY[office] ?? 20000;
    salaries += annual * y;
  }

  // Corrupción acumulada implícita: sombra + escándalos + calidad escándalo
  const scandalTurns = player.officesHeld.filter((h) => h.quality === 'escandalo').length;
  const corruptionScore = Math.min(
    100,
    player.sombra * 0.55 + player.escandalos * 12 + scandalTurns * 8,
  );
  // Ética efectiva (no tenemos stat ética en Player actual — derivamos de sombra inversa + flags)
  const ethics = Math.max(5, 100 - corruptionScore - (player.flags.includes('destino_naranja') ? 0 : 0));

  // Bajo manta: crece con corrupción, se frena con ética residual
  const greed = corruptionScore / 100;
  const restraint = ethics / 100;
  let underTable = Math.round(salaries * (0.02 + greed * 0.55) * (1.15 - restraint * 0.5));
  if (corruptionScore < 15) underTable = Math.round(salaries * 0.01); // casi limpio: solo "detalles"
  if (corruptionScore > 70) underTable = Math.round(underTable * 1.35);

  const peak = peakOffice(player);
  const total = salaries + underTable;

  let ethicsNote = 'Expediente más bien limpio… o muy bien barrido.';
  if (corruptionScore >= 70) ethicsNote = 'La Agencia Tributaria querría una tertulia contigo.';
  else if (corruptionScore >= 45) ethicsNote = 'Hay facturas que no salen en el BOE.';
  else if (corruptionScore >= 25) ethicsNote = 'Regalos, viajes y «detalles» de los que no se hablan.';
  else ethicsNote = 'Casi aburrido de lo limpio. Casi.';

  const jokes = [
    `Con eso te compras un ático… o tres abogados.`,
    `Patrimonio declarado: sonrisa. Patrimonio real: otra cosa.`,
    `Si Hacienda pregunta, diga que fue «networking».`,
    `El pueblo lo notó. El notario, más.`,
    `En España esto se llama «esfuerzo». En Suiza, «cuenta».`,
  ];
  const joke = jokes[Math.abs(Math.round(total)) % jokes.length]!;

  return {
    salaries: Math.round(salaries),
    underTable: Math.round(underTable),
    total: Math.round(total),
    ethicsNote,
    joke,
    peakOffice: peak.id,
    peakTitle: peak.title,
  };
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}
