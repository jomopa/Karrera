import type { SalaCard } from '../../types';
import { R01 } from './cards/r01_sonrisa_cero';
import { R02 } from './cards/r02_bronca_llamada';
import { R03 } from './cards/r03_eufemismo_no';
import { R04 } from './cards/r04_micro_fusible';
import { R05 } from './cards/r05_silencio_barones';
import { R06 } from './cards/r06_encuesta_foto';
import { R07 } from './cards/r07_titular_lista';
import { R08 } from './cards/r08_cafe_sin_prisa';
import { R09 } from './cards/r09_favor_visible';
import { R10 } from './cards/r10_ausencia_whatsapp';
import { SALA_RULES } from './rules';

export { SALA_RULES, READING_LABELS, getSalaRule } from './rules';

export const SALA_CARDS: SalaCard[] = [
  ...R01,
  ...R02,
  ...R03,
  ...R04,
  ...R05,
  ...R06,
  ...R07,
  ...R08,
  ...R09,
  ...R10,
];

/** Lint de contenido al cargar (dev) */
function assertSalaBank() {
  if (SALA_CARDS.length !== 100) {
    throw new Error(`SALA_CARDS expected 100, got ${SALA_CARDS.length}`);
  }
  for (const rule of SALA_RULES) {
    const n = SALA_CARDS.filter((c) => c.ruleId === rule.id).length;
    if (n !== 10) throw new Error(`Rule ${rule.id} expected 10 cards, got ${n}`);
  }
  const ids = new Set<string>();
  for (const c of SALA_CARDS) {
    if (ids.has(c.id)) throw new Error(`Duplicate sala id ${c.id}`);
    ids.add(c.id);
    if (!c.options.includes(c.correct)) throw new Error(`${c.id}: correct missing`);
    const roles = c.signals.map((s) => s.role).sort().join(',');
    if (roles !== 'dominant,noise,support') throw new Error(`${c.id}: bad roles`);
  }
}

assertSalaBank();
