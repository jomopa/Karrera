import type { SalaReading, SalaRuleId } from '../../types';

export interface SalaRuleDef {
  id: SalaRuleId;
  /** ≤10 palabras, verdad del poder */
  rule: string;
  /** Feedback al acertar */
  lessonOk: string;
  /** Feedback al fallar: nombra la regla */
  lessonFail: string;
  defaultCorrect: SalaReading;
}

export const SALA_RULES: SalaRuleDef[] = [
  {
    id: 'sonrisa_cero',
    rule: 'Sonrisa de aparato + cero encargo = aparcamiento',
    lessonOk: 'Leíste la sonrisa vacía. Sin encargo, no hay ascenso.',
    lessonFail: 'Te comiste la sonrisa. Sin encargo, te aparcan.',
    defaultCorrect: 'aparcan',
  },
  {
    id: 'bronca_llamada',
    rule: 'Bronca pública + llamada privada = te necesitan',
    lessonOk: 'La bronca era teatro. La llamada era el dato.',
    lessonFail: 'Huiste de la bronca. Te necesitaban en privado.',
    defaultCorrect: 'usan',
  },
  {
    id: 'eufemismo_no',
    rule: '«Ya hablaremos» o responsabilidad = no',
    lessonOk: 'Tradujiste el eufemismo: era un no educado.',
    lessonFail: 'Creíste el «ya hablaremos». En política eso es no.',
    defaultCorrect: 'aparcan',
  },
  {
    id: 'micro_fusible',
    rule: 'Micrófono tras tu fallo = fusible mediático',
    lessonOk: 'Olisite el fusible. El micrófono era para quemarte.',
    lessonFail: 'Pediste el micrófono. Eras el fusible del día.',
    defaultCorrect: 'queman',
  },
  {
    id: 'silencio_barones',
    rule: 'Silencio del jefe + barones en movimiento = guerra',
    lessonOk: 'El silencio mandaba guerra. Tú eras el mensajero.',
    lessonFail: 'Leíste paz en el silencio. Había guerra de barones.',
    defaultCorrect: 'mensajero',
  },
  {
    id: 'encuesta_foto',
    rule: 'Encuesta mala + foto contigo = te queman',
    lessonOk: 'La foto tras la encuesta era el epitafio.',
    lessonFail: 'Sonreíste a la cámara. Te estaban quemando.',
    defaultCorrect: 'queman',
  },
  {
    id: 'titular_lista',
    rule: 'Titular alegre + lista muda = manda la lista',
    lessonOk: 'Ignoraste el titular. Mandaba la lista.',
    lessonFail: 'Leíste el titular. Mandaba la lista — y callaba.',
    defaultCorrect: 'aparcan',
  },
  {
    id: 'cafe_sin_prisa',
    rule: 'Café sin prisa + cero fecha = aparcamiento',
    lessonOk: 'Sin fecha no hay café: hay aparcamiento elegante.',
    lessonFail: 'Aceptaste el café eterno. Te aparcaron con cortesía.',
    defaultCorrect: 'aparcan',
  },
  {
    id: 'favor_visible',
    rule: 'Favor público pequeño + deuda grande = te usan',
    lessonOk: 'El favor barato compraba una deuda cara.',
    lessonFail: 'Agradeciste el favor. Ya eras útil — y barato.',
    defaultCorrect: 'usan',
  },
  {
    id: 'ausencia_whatsapp',
    rule: 'Fuera del chat que manda = ya caíste',
    lessonOk: 'Notaste el silencio del chat serio. Ya estabas fuera.',
    lessonFail: 'Seguías en el grupo grande. El que manda te había borrado.',
    defaultCorrect: 'aparcan',
  },
];

export const READING_LABELS: Record<SalaReading, string> = {
  ascienden: 'Te ascienden',
  aparcan: 'Te aparcan',
  usan: 'Te usan',
  queman: 'Te queman',
  mensajero: 'Hay guerra: eres mensajero',
  rumor_trampa: 'El rumor es trampa',
  callar: 'Es momento de callar',
  hablar: 'Es momento de hablar',
};

export function getSalaRule(id: SalaRuleId): SalaRuleDef {
  return SALA_RULES.find((r) => r.id === id)!;
}
