import type { ChoiceKind, PartyId, PersonalityId, Player, Quality } from '../types';
import { getOffice } from '../data/catalog';
import { Rng } from '../engine/rng';

export type Valence = 'up' | 'flat' | 'down';

/** Puntuación de carrera: 48 base → 99 techo. Pico alto + vibe − escándalos. */
export function computeRating(player: Player): number {
  const peak = Math.max(
    getOffice(player.office).tier,
    ...player.officesHeld.map((h) => getOffice(h.office).tier),
  );
  // Curva concava: tiers altos aportan menos por peldaño (brillante = raro en índice)
  const tierPart = Math.round(Math.pow(peak / 9, 1.35) * 40);
  const vibePart = Math.round((player.forma * 0.55 + player.fama * 0.45) / 38);
  const penalty = Math.min(10, player.escandalos * 2 + Math.max(0, player.derrotas - player.victorias));
  const skillBonus =
    (player.flags.includes('sala_fria') ? 1 : 0) +
    Math.min(2, player.seenQuizIds.length > 0 ? Math.floor(player.victorias / 4) : 0);
  return Math.max(48, Math.min(99, 48 + tierPart + vibePart - penalty + skillBonus));
}

function era(year: number): 'zap' | 'rajoy' | 'bloqueo' | 'sanchez' | 'tarde' {
  if (year <= 2011) return 'zap';
  if (year <= 2015) return 'rajoy';
  if (year <= 2018) return 'bloqueo';
  if (year <= 2023) return 'sanchez';
  return 'tarde';
}

type LineBag = Record<Valence, string[]>;

const BY_ERA: Record<ReturnType<typeof era>, LineBag> = {
  zap: {
    up: [
      'Zapatero pregunta tu nombre en un corrillo. Eso no pasa dos veces.',
      'Rubalcaba asiente en silencio: el cumplido más caro del PSOE.',
      'Chacón te mira como quien anota un fichaje.',
      'Solbes no sonríe, pero te deja hablar. Victoriaitoria.',
      'Un barón territorial dice: «Este/a vale».',
      'La Moncloa de entonces te cuela en una lista interna. Casi fama.',
    ],
    flat: [
      'Nadie te llama. En 2009 eso casi es una victoria.',
      'El aparato archiva tu gesto como «correcto». Sin stars.',
      'Sobrevives al consejo sin foto ni herida.',
      'Quedas en el acta. El BOE no te nombra.',
    ],
    down: [
      'Zapatero te llama trepa en privado. Te llega el eco.',
      'Rubalcaba cierra el pliegue: «Otro día».',
      'Te dejan fuera del WhatsApp serio de la agrupación.',
      'Un veterano susurra: «Demasiada prisa».',
      'Te archivan como «ruido». En 2010 eso duele.',
    ],
  },
  rajoy: {
    up: [
      'Rajoy te ha escuchado… y no ha bostezado. Milagro administrativo.',
      'Cospedal toma nota con bolígrafo caro. Peligroso y útil.',
      'Wert no te interrumpe. En este gobierno eso es cariño.',
      'Un barón del PP te invita a «tomar algo» sin cámaras.',
      'Montoro gruñe menos de lo habitual cuando hablas de números.',
      'Génova te mete en el circuito de los que «saben estar».',
    ],
    flat: [
      'Rajoy no comenta. El silencio popular también es política.',
      'Quedas en el acta. Nadie te odia. Nadie te asciende hoy.',
      'Génova archiva: «correcto». Traducción: invisible.',
      'Te citan en un documento. Sin adjetivos. Sin gloria.',
    ],
    down: [
      'Rajoy te mira como a un PowerPoint eterno.',
      'Cospedal sonríe demasiado: no es buena señal.',
      'Te mandan a «hablar con los medios»… de castigo.',
      'Un fontanero dice off the record: «Se ha pasado».',
      'Te bajan de la foto de familia. Literalmente.',
    ],
  },
  bloqueo: {
    up: [
      'Pedro Sánchez te dedica media sonrisa de primarias. Vale un ministerio.',
      'Iglesias cita tu frase sin decir tu nombre. Casi fama.',
      'Rivera te retuitea. En 2016 eso aún era capital.',
      'Errejón dice «interesante» y todo el mundo lo nota.',
      'Un diputado de la nueva política te pide café. Hay mesa.',
      'En la investidura fallida, alguien te mira como pieza útil.',
    ],
    flat: [
      'El bloqueo te digiere. Ni investidura ni epitafio.',
      'Repites en comisión. El Congreso bosteza en estéreo.',
      'Tu partido te quiere… para la siguiente lista, ya veremos.',
      'Otro mes sin gobierno. Tu cargo, igual.',
    ],
    down: [
      'Sánchez te aparca con educación quirúrgica.',
      'Rivera hace un chiste a tu costa. La sala ríe demasiado.',
      'En el grupo te llaman «el/la del hilo eterno».',
      'Una filtración te pinta como parte del problema.',
      'Te usan de ejemplo de lo que «no hay que hacer» en bloqueo.',
    ],
  },
  sanchez: {
    up: [
      'Moncloa pregunta por ti. Aunque sea un becario quien llama.',
      'Yolanda Díaz asiente: eso abre puertas plurinacionales.',
      'Feijóo te dedica un «bien dicho» en off. Raro y valioso.',
      'Ayuso te cita para pelearte. En Madrid eso es protagonismo.',
      'Abascal te nombra en un mitin. Odio útil.',
      'Entran tu nombre en una quiniela de listas. Empieza el vértigo.',
    ],
    flat: [
      'La coalición te ignora con precisión milimétrica.',
      'Pasan la pandemia y tú sigues en el mismo escaño emocional.',
      'Cumples. El BOE no aplaude.',
      'Hay reunión. Hay acta. No hay ascenso.',
    ],
    down: [
      'Te cae un titular tóxico con tu apellido mal escrito.',
      'Casado/Feijóo (elige época) te usa de ejemplo de lo que no hay que hacer.',
      'En Ferraz dicen «ya hablaremos» y no hablan.',
      'Un asesor filtra que «sobra».',
      'Te conviertes en nota a pie de página de la crisis.',
    ],
  },
  tarde: {
    up: [
      'Una encuesta interna te pone «imprescindible». Cuidado: es adictivo.',
      'Bruselas pregunta tu agenda. El café mejora de golpe.',
      'Tu nombre sale en una quiniela de listas. Empieza el vértigo.',
      'Un rival reconoce tu oficio en público. Histórico.',
      'Te piden que «cierres el ciclo» con dignidad. Hay foto.',
    ],
    flat: [
      'El ciclo te deja donde estabas: ni gloria ni sumario.',
      'Archivo, gestiones, sonrisa. España burocrática en estado puro.',
      'Cierras el año sin titulares. A veces basta.',
    ],
    down: [
      'La hemeroteca te muerde el tobillo.',
      'Te conviertes en ejemplo de lo que el partido «ya no es».',
      'Un podcast te disecciona sin pedirte permiso.',
      'El relevo te mira como a un mueble. Duele.',
    ],
  },
};

const BY_PARTY: Partial<Record<PartyId, LineBag>> = {
  psoe: {
    up: ['Ferraz te pone en el circuito de «los que vienen».', 'Un federal te debe un favor. Anótalo.'],
    flat: ['El PSOE te digiere sin digestión: clásico.'],
    down: ['La vieja guardia te etiqueta: «demasiado nuevo».'],
  },
  pp: {
    up: ['Génova sonríe con los dientes. Es su forma de querer.', 'Un barón dice que «sabes estar».'],
    flat: ['El PP premia la paciencia. Hoy toca paciencia.'],
    down: ['Te llaman «ruido» en un despacho con bandera.'],
  },
  podemos: {
    up: ['La asamblea (esta vez) no te abuchea. Casi un óscar.', 'Circula tu clip en los grupos serios.'],
    flat: ['Otro círculo, otro debate, misma carbonilla.'],
    down: ['Te acusan de «casta interna». Dueles con estética.'],
  },
  ciudadanos: {
    up: ['El naranja te abraza. Abrazos naranjas caducan, pero hoy calientan.'],
    flat: ['Cs te mantiene en el selfie. Sin escaño emocional.'],
    down: ['El centro se te resbala entre los dedos.'],
  },
  vox: {
    up: ['El mitin te nombra. La adrenalina hace el resto.'],
    flat: ['Cumples el guion. La tribuna pide más sangre.'],
    down: ['Te marcan como blando. En Vox eso es un delito menor.'],
  },
  iu: {
    up: ['La coalición te necesita visible. Raro y dulce.'],
    flat: ['IU te quiere útil y callado. Estándar.'],
    down: ['Te pisan en la foto de unidad. Otra vez.'],
  },
  upyd: {
    up: ['Rosa Díez (o su fantasma) aprobaría el tono.'],
    flat: ['Regeneración sin focos. Especialidad de la casa.'],
    down: ['Hasta UPyD te encuentra «poco práctico».'],
  },
  sumar: {
    up: ['Entras en la foto de confluencia sin codazos visibles.'],
    flat: ['Sumar te cuenta. En silencio administrativo.'],
    down: ['La negociación de listas te deja en el margen del margen.'],
  },
};

const BY_PERSONALITY: Record<PersonalityId, LineBag> = {
  fontanero: {
    up: [
      'Un jefe de organización te debe un favor. Oro líquido.',
      'La lista te sonríe en privado. Nadie lo tuitea: perfecto.',
      'Te cuelan en el circuito de «los que arreglan».',
    ],
    flat: [
      'Cumples el trámite. El pasillo ni te mira ni te odia.',
      'El aparato te archiva como «fiable». Sin brillo.',
    ],
    down: [
      'Una filtración te nombra. El fontanero odia la luz.',
      'Te dejan fuera del WhatsApp que manda de verdad.',
      'Un cuchillo de pasillo te busca el riñón.',
    ],
  },
  atril: {
    up: [
      'El clip funciona. Hasta el rival te cita con rabia.',
      'Te piden para tertulia. El ego se alimenta solo.',
      'Titular a favor. El micrófono te quiere.',
    ],
    flat: [
      'Sales en el telediario tres segundos. Ni gloria ni meme.',
      'La frase queda en el aire. Sin eco, sin herida.',
    ],
    down: [
      'Te conviertes en meme antes de que acabes la frase.',
      'El viral va contra ti. El atril también quema.',
      'Te cancelan el corte bueno. Queda el malo.',
    ],
  },
  cruzado: {
    up: [
      'La causa te abraza. Hay militancia que no se compra.',
      'Te llaman coherente. En política española es casi un insulto útil.',
      'Un movimiento te cita como ejemplo. Sube la adrenalina ética.',
    ],
    flat: [
      'Mantienes la línea. El partido te tolera. Sin más.',
      'Ni ruptura ni aplauso. Pureza en gris.',
    ],
    down: [
      'El partido te marca como problema de pureza.',
      'Te acusan de suicidio político. A veces tienen razón.',
      'La línea roja te deja solo en el pasillo.',
    ],
  },
};

const GENERIC: LineBag = {
  up: [
    'La jugada te sale: hay sonrisa en el pasillo correcto.',
    'Alguien poderoso dice tu apellido sin burla.',
    'Subes enteros. Se nota en cómo te miran.',
  ],
  flat: [
    'Ni gloria ni expedientes. Empate técnico con la realidad.',
    'El día termina sin titulares. A veces basta.',
  ],
  down: [
    'La jugada se tuerce. El eco llega antes que tú.',
    'Alguien poderoso frunce el ceño. Suficiente daño.',
    'Pierdes fuelle. El aparato toma nota.',
  ],
};

export function valenceFromQuality(
  quality: Quality,
  fromTier: number,
  toTier: number,
): Valence {
  if (quality === 'excelente' || quality === 'bien') return 'up';
  if (quality === 'escandalo' || quality === 'mal') return 'down';
  if (toTier > fromTier) return 'up';
  if (toTier < fromTier) return 'down';
  return 'flat';
}

function pickUnseen(rng: Rng, pool: string[], seen: string[]): string {
  const fresh = pool.filter((l) => !seen.includes(l));
  const use = fresh.length ? fresh : pool;
  return rng.pick(use);
}

export function pickReaction(
  rng: Rng,
  opts: {
    year: number;
    party: PartyId;
    personality: PersonalityId;
    valence: Valence;
    kind: ChoiceKind;
    choiceOk: string;
    choiceFail: string;
    success: boolean;
    seen: string[];
  },
): { reaction: string; support: string } {
  const e = era(opts.year);
  const pool = [
    ...BY_ERA[e][opts.valence],
    ...(BY_PARTY[opts.party]?.[opts.valence] ?? []),
    ...BY_PERSONALITY[opts.personality][opts.valence],
    ...GENERIC[opts.valence],
  ];
  const reaction = pickUnseen(rng, pool, opts.seen);
  const support = opts.success ? opts.choiceOk : opts.choiceFail;
  return { reaction, support };
}
