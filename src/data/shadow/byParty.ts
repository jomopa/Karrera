import type { ShadowOffer } from '../../types';
import { S } from './_helpers';

/** Matices por partido: corrupción y traición con acento propio. */
export const SHADOW_BY_PARTY: ShadowOffer[] = [
  // ——— PSOE ———
  S('psoe_ere_eco', {
    theme: 'corrupcion',
    parties: ['psoe'],
    eras: ['zap', 'rajoy'],
    bands: ['mid', 'high'],
    title: 'Eco de los ERE',
    pitch:
      'En el territorio alguien habla de «ayudas» que no cuadran. Te ofrecen alejarte… o repartir silencio a cambio de lista.',
    win: {
      punch: 'El silencio te coloca. El eco, más tarde, buscará a otro.',
      stim: ['ERE', 'Silencio'],
    },
    lose: {
      punch: 'El eco te encuentra. «Todos sabían» incluye tu nombre en minúscula.',
      stim: ['Hemeroteca'],
    },
    setFlagsWin: ['caja_b'],
    weight: 12,
  }),
  S('psoe_ferraz', {
    theme: 'traicion',
    parties: ['psoe'],
    bands: ['mid', 'high', 'top'],
    title: 'Pasillo de Ferraz',
    pitch:
      'Hay dos móviles y una guerra de facciones. Te piden elegir antes del comité. El perdedor no olvida; el ganador tampoco.',
    win: {
      punch: 'Eliges bien. Ferraz te mira distinto: ya no eres carne de agrupación.',
      stim: ['Ferraz'],
    },
    lose: {
      punch: 'Eliges mal. Te mandan a «hablar con la base»… sin micrófono.',
      stim: ['Base castigo'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),
  S('psoe_font_sanchismo', {
    theme: 'filtracion',
    parties: ['psoe'],
    eras: ['bloqueo', 'sanchez'],
    personalities: ['fontanero'],
    title: 'WhatsApp de resistencia',
    pitch:
      'Un chat de «resistencia» quiere munición contra el aparato. Tú tienes capturas. Son oro o radioactivo.',
    win: {
      punch: 'Las capturas mueven un congreso. Quedas como fontanero invisible del milagro.',
      stim: ['Capturas'],
    },
    lose: {
      punch: 'El chat se filtra entero. Incluye tu nombre. Resistencia, adiós.',
      stim: ['Chat entero'],
    },
  }),

  // ——— PP ———
  S('pp_sobres', {
    theme: 'caja_b',
    parties: ['pp'],
    eras: ['zap', 'rajoy'],
    bands: ['low', 'mid', 'high'],
    title: 'El rumor de los sobres',
    pitch:
      'Antes de la portada, el pasillo. Te ofrecen «colaborar con la caja» como quien invita a un café. El café es opaco.',
    win: {
      punch: 'Entras en la caja. El café sabe a poder y a miedo.',
      stim: ['Sobres'],
    },
    lose: {
      punch: 'Tu inicial aparece en un papel que nadie debía fotocopiar.',
      stim: ['Papel'],
    },
    setFlagsWin: ['caja_b'],
    weight: 13,
  }),
  S('pp_barcenas', {
    theme: 'chantaje',
    parties: ['pp'],
    eras: ['rajoy', 'bloqueo'],
    bands: ['mid', 'high', 'top'],
    title: 'Luis, otra vez',
    pitch:
      'El nombre vuelve. Alguien tiene apuntes. Te piden lealtad pública a cambio de no ser «el siguiente en la libreta».',
    win: {
      punch: 'Lealtad pública. Libreta ajena. Sigues en el organigrama.',
      stim: ['Libreta'],
    },
    lose: {
      punch: 'Sales en la libreta igual. La lealtad no era un escudo: era un recibo.',
      stim: ['Recibo'],
    },
    weight: 12,
  }),
  S('pp_genova', {
    theme: 'traicion',
    parties: ['pp'],
    eras: ['bloqueo', 'sanchez'],
    bands: ['high', 'top'],
    title: 'Génova en guerra',
    pitch:
      'Casado, Ayuso, o el eco de ambos. Te piden bando. En el PP de hoy, la neutralidad es sospecha.',
    win: {
      punch: 'Tu bando gana el relato semanal. Heredas un trozo de Génova.',
      stim: ['Génova'],
    },
    lose: {
      punch: 'Tu bando pierde el sábado. El domingo ya no tienes despacho simbólico.',
      stim: ['Sábado negro'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),

  // ——— IU / PODEMOS / SUMAR ———
  S('iu_asamblea', {
    theme: 'traicion',
    parties: ['iu'],
    bands: ['civil', 'low', 'mid'],
    title: 'Asamblea con cuchillo',
    pitch:
      'La asamblea vota pureza. Entre bambalinas te ofrecen un pacto de listas que la asamblea odiaría. Democracia… dirigida.',
    win: {
      punch: 'El pacto pasa. La asamblea aplaude sin saber el guion.',
      stim: ['Listas'],
    },
    lose: {
      punch: 'Alguien lee el pacto en voz alta. Pureza 1 — Tú 0.',
      stim: ['Pureza'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),
  S('podemos_circulos', {
    theme: 'traicion',
    parties: ['podemos'],
    eras: ['bloqueo', 'sanchez'],
    bands: ['low', 'mid', 'high'],
    title: 'Círculo contra círculo',
    pitch:
      'Errejón o Iglesias, o el fantasma de ambos. Te piden filtrar un audio interno. La revolución también tiene pasillos.',
    win: {
      punch: 'El audio decide una pelea. Te ascienden en el relato moral… con mancha.',
      stim: ['Audio'],
    },
    lose: {
      punch: 'Te acusan de policía. En este partido, eso duele más que un sumario.',
      stim: ['Policía'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),
  S('podemos_fundacion', {
    theme: 'corrupcion',
    parties: ['podemos', 'sumar'],
    eras: ['sanchez', 'tarde'],
    bands: ['mid', 'high'],
    title: 'Fundación y factura',
    pitch:
      'Una fundación amiga necesita «actividad». El dinero público mira a otro lado si tú firmas el puente.',
    win: {
      punch: 'El puente se firma. La fundación crece. Tu ética, menos.',
      stim: ['Fundación'],
    },
    lose: {
      punch: 'La factura sale en un medio hostil. «Casta» te lo dice tu propia base.',
      stim: ['Casta'],
    },
    setFlagsWin: ['caja_b'],
  }),
  S('sumar_confluencia', {
    theme: 'enchufe',
    parties: ['sumar'],
    eras: ['tarde'],
    bands: ['low', 'mid', 'high'],
    title: 'Cupo de confluencia',
    pitch:
      'Hay un cupo negociado. Te lo ofrecen si «suavizas» una crítica pública. La confluencia también es fontanería.',
    win: {
      punch: 'El cupo llega. La crítica se vuelve niebla diplomática.',
      stim: ['Cupo'],
    },
    lose: {
      punch: 'Suavizas… y te quedas sin cupo. Doble derrota moral.',
      stim: ['Niebla'],
    },
  }),

  // ——— CIUDADANOS ———
  S('cs_naranja', {
    theme: 'traicion',
    parties: ['ciudadanos'],
    eras: ['bloqueo', 'sanchez'],
    bands: ['low', 'mid', 'high'],
    title: 'Salto naranja',
    pitch:
      'El proyecto cruje. Alguien te enseña la puerta al PP… o al vacío. Transfuguismo con PowerPoint.',
    win: {
      punch: 'Saltas a tiempo. El PowerPoint del otro lado te recibe con café.',
      stim: ['Transfuguismo'],
    },
    lose: {
      punch: 'Saltas tarde. Los dos lados te llaman traidor. El centro se evaporó sin ti.',
      stim: ['Tarde'],
    },
    requireFlags: ['destino_naranja'],
    setFlagsLose: ['traidor_marcado'],
    weight: 14,
  }),
  S('cs_albert', {
    theme: 'filtracion',
    parties: ['ciudadanos'],
    eras: ['bloqueo'],
    personalities: ['atril'],
    title: 'Frase contra Rivera',
    pitch:
      'Un medio quiere «disidencia naranja». Una frase tuya puede hacer carrera… o incinerarla.',
    win: {
      punch: 'La frase pega. Quedas como el naranja lúcido. Rivera frunce el ceño útil.',
      stim: ['Frase'],
    },
    lose: {
      punch: 'La frase pega demasiado. Te abren expediente simbólico y real.',
      stim: ['Expediente'],
    },
  }),

  // ——— VOX ———
  S('vox_caja', {
    theme: 'caja_b',
    parties: ['vox'],
    eras: ['sanchez', 'tarde'],
    bands: ['mid', 'high'],
    title: 'Caja del aparato verde',
    pitch:
      'Hay donaciones que no quieren foco. Te ofrecen gestionar el opaco a cambio de un salto orgánico.',
    win: {
      punch: 'Gestionas el opaco. El aparato verde te debe un escaño simbólico.',
      stim: ['Donaciones'],
    },
    lose: {
      punch: 'Un ex militante habla. El opaco se vuelve titular. Tú, carnaza.',
      stim: ['Ex'],
    },
    setFlagsWin: ['caja_b'],
  }),
  S('vox_puras', {
    theme: 'traicion',
    parties: ['vox'],
    bands: ['low', 'mid', 'high'],
    title: 'Purga interna',
    pitch:
      'Hay una lista de «blandos». Te piden señalar. En este partido, señalar es ascender… o ser el siguiente.',
    win: {
      punch: 'Señalas. La purga te deja sitio. Duermes con la luz encendida.',
      stim: ['Purga'],
    },
    lose: {
      punch: 'Te señalan a ti. «Blando» es un epitafio rápido.',
      stim: ['Blando'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),

  // ——— UPyD ———
  S('upyd_pureza', {
    theme: 'chantaje',
    parties: ['upyd'],
    eras: ['zap', 'rajoy', 'bloqueo'],
    bands: ['civil', 'low', 'mid'],
    title: 'Pureza vs aparato',
    pitch:
      'Te ofrecen un atajo de listas que contradice el manual regeneracionista. Rosa Díez no tiene que enterarse… o sí.',
    win: {
      punch: 'El atajo funciona. La pureza se aplaza a un congreso futuro.',
      stim: ['Manual'],
    },
    lose: {
      punch: 'El manual te juzga en público. Regeneración 1 — Ambición 0.',
      stim: ['Congreso'],
    },
  }),
  S('upyd_salida', {
    theme: 'traicion',
    parties: ['upyd'],
    eras: ['rajoy', 'bloqueo'],
    title: 'Puerta naranja',
    pitch:
      'Ciudadanos llama. El proyecto moribundo o el futuro naranja. Traicionar la idea o traicionar el escaño.',
    win: {
      punch: 'Sales a tiempo. El naranja aún brilla. UPyD queda en el espejo retrovisor.',
      stim: ['Salida'],
    },
    lose: {
      punch: 'Sales mal. Los dos te llaman oportunista. Historia express de centro.',
      stim: ['Oportunista'],
    },
    setFlagsWin: ['destino_naranja'],
    setFlagsLose: ['traidor_marcado'],
    weight: 11,
  }),
];
