import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Encuesta mala + foto contigo = te queman */
export const R06: SalaCard[] = [
  card('ef_z1', 'encuesta_foto', {
    eras: ['zap'], room: 'media', frame: 'Mañana de sondeo',
    signals: [
      sig('La encuesta interna sangra', 'dominant'),
      sig('Te ponen en la foto de portada', 'support'),
      sig('El jefe dice «no pasa nada»', 'noise', 'fontanero'),
    ],
    options: ['hablar', 'queman', 'aparcan'],
    correct: 'queman',
  }),
  card('ef_z2', 'encuesta_foto', {
    eras: ['zap'], room: 'calle', frame: 'Acto con pancarta',
    signals: [
      sig('El CIS duele en privado', 'dominant'),
      sig('Te colocan junto al cartel del fracaso', 'support'),
      sig('Hay selfie espontánea con jóvenes', 'noise', 'atril'),
    ],
    options: ['queman', 'usan', 'ascienden'],
    correct: 'queman',
  }),
  card('ef_r1', 'encuesta_foto', {
    eras: ['rajoy'], room: 'media', frame: 'Portada del domingo',
    signals: [
      sig('El tracking baja tres puntos', 'dominant'),
      sig('Tu cara ilustra el artículo', 'support'),
      sig('Te llaman «rostro del cambio» por error', 'noise'),
    ],
    options: ['queman', 'rumor_trampa', 'hablar'],
    correct: 'queman',
  }),
  card('ef_r2', 'encuesta_foto', {
    eras: ['rajoy'], room: 'aparato', frame: 'War room post-sondeo',
    signals: [
      sig('Los números no cuadran', 'dominant'),
      sig('Te piden pose para «el relato»', 'support'),
      sig('Hay pizza y ánimos forzados', 'noise'),
    ],
    options: ['callar', 'queman', 'mensajero'],
    correct: 'queman',
  }),
  card('ef_b1', 'encuesta_foto', {
    eras: ['bloqueo'], room: 'media', frame: 'Noche electoral',
    signals: [
      sig('El escrutinio es una bofetada', 'dominant'),
      sig('Las cámaras buscan tu gesto', 'support'),
      sig('Un afiliado te abraza llorando', 'noise', 'cruzado'),
    ],
    options: ['queman', 'hablar', 'aparcan'],
    correct: 'queman',
  }),
  card('ef_b2', 'encuesta_foto', {
    eras: ['bloqueo'], room: 'institucional', frame: 'Pasillo del Congreso',
    signals: [
      sig('La encuesta de gabinete es cruel', 'dominant'),
      sig('Te esperan fotógrafos en la puerta', 'support'),
      sig('Un diputado te dice «aguanta»', 'noise'),
    ],
    options: ['callar', 'queman', 'usan'],
    correct: 'queman',
  }),
  card('ef_s1', 'encuesta_foto', {
    eras: ['sanchez'], room: 'media', frame: 'Crisis de relato',
    signals: [
      sig('El sondeo castiga el mensaje', 'dominant'),
      sig('Te eligen para la foto del desgaste', 'support'),
      sig('Moncloa filtra que «confían»', 'noise', 'fontanero'),
    ],
    options: ['queman', 'ascienden', 'rumor_trampa'],
    correct: 'queman',
  }),
  card('ef_s2', 'encuesta_foto', {
    eras: ['sanchez'], room: 'calle', frame: 'Mitin bajo lluvia',
    signals: [
      sig('La estimación autonómica duele', 'dominant'),
      sig('Te ponen en el cartel mojado', 'support'),
      sig('La gente corea tu nombre igual', 'noise', 'cruzado'),
    ],
    options: ['hablar', 'queman', 'aparcan'],
    correct: 'queman',
  }),
  card('ef_t1', 'encuesta_foto', {
    eras: ['tarde'], room: 'media', frame: 'Panel de expertos',
    signals: [
      sig('El tracking digital es un abismo', 'dominant'),
      sig('El thumbnail eres tú con cara larga', 'support'),
      sig('El algoritmo te da «alcance»', 'noise', 'atril'),
    ],
    options: ['queman', 'hablar', 'callar'],
    correct: 'queman',
  }),
  card('ef_t2', 'encuesta_foto', {
    eras: ['tarde'], room: 'aparato', frame: 'Comité de campaña',
    signals: [
      sig('La encuesta cualitativa te nombra', 'dominant'),
      sig('Piden foto tuya para el dossier malo', 'support'),
      sig('Te ofrecen coaching de sonrisa', 'noise'),
    ],
    options: ['aparcan', 'queman', 'usan'],
    correct: 'queman',
  }),
];
