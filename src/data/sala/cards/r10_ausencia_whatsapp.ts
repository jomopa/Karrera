import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Fuera del chat que manda = ya caíste */
export const R10: SalaCard[] = [
  card('aw_z1', 'ausencia_whatsapp', {
    eras: ['zap'], room: 'aparato', frame: 'Noche de listas',
    signals: [
      sig('El grupo serio ya no te menciona', 'dominant'),
      sig('Sigues en el grupo grande de memes', 'support'),
      sig('Te llegan cadenas de ánimo', 'noise'),
    ],
    options: ['callar', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('aw_z2', 'ausencia_whatsapp', {
    eras: ['zap'], room: 'intimidad', frame: 'Mañana después',
    signals: [
      sig('El hilo de «los que deciden» te expulsó', 'dominant'),
      sig('Nadie te lo dice a la cara', 'support'),
      sig('Un compañero te invita a cerveza', 'noise', 'cruzado'),
    ],
    options: ['aparcan', 'queman', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('aw_r1', 'ausencia_whatsapp', {
    eras: ['rajoy'], room: 'aparato', frame: 'Génova · madrugada',
    signals: [
      sig('El chat de organización te silencia', 'dominant'),
      sig('Tu teléfono solo recibe spam del partido', 'support'),
      sig('Te etiquetan en una foto antigua', 'noise', 'atril'),
    ],
    options: ['aparcan', 'callar', 'usan'],
    correct: 'aparcan',
  }),
  card('aw_r2', 'ausencia_whatsapp', {
    eras: ['rajoy'], room: 'faccion', frame: 'Guerra interna',
    signals: [
      sig('Los dos bandos tienen grupos… sin ti', 'dominant'),
      sig('Te enteras de la pelea por la prensa', 'support'),
      sig('Alguien te pide «neutralidad»', 'noise', 'fontanero'),
    ],
    options: ['mensajero', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('aw_b1', 'ausencia_whatsapp', {
    eras: ['bloqueo'], room: 'media', frame: 'Noche de pacto',
    signals: [
      sig('El grupo de negociación no te incluye', 'dominant'),
      sig('El acuerdo sale y te pillan en frío', 'support'),
      sig('Tu timeline celebra el pacto', 'noise', 'atril'),
    ],
    options: ['aparcan', 'rumor_trampa', 'queman'],
    correct: 'aparcan',
  }),
  card('aw_b2', 'ausencia_whatsapp', {
    eras: ['bloqueo'], room: 'aparato', frame: 'Primarias',
    signals: [
      sig('El núcleo deja de responderte', 'dominant'),
      sig('Solo te escriben para actos de relleno', 'support'),
      sig('Hay stickers de victoria en otro chat', 'noise'),
    ],
    options: ['callar', 'aparcan', 'usan'],
    correct: 'aparcan',
  }),
  card('aw_s1', 'ausencia_whatsapp', {
    eras: ['sanchez'], room: 'institucional', frame: 'Remodelación',
    signals: [
      sig('El grupo de gabinete te deja fuera', 'dominant'),
      sig('Te enteras por un filtrado', 'support'),
      sig('Te felicitan por «trabajo callado»', 'noise', 'fontanero'),
    ],
    options: ['aparcan', 'queman', 'ascienden'],
    correct: 'aparcan',
  }),
  card('aw_s2', 'ausencia_whatsapp', {
    eras: ['sanchez'], room: 'calle', frame: 'Campaña',
    signals: [
      sig('El chat de ruta ya no te añade', 'dominant'),
      sig('Tu bus no aparece en el Excel', 'support'),
      sig('La base te pide foto igual', 'noise', 'cruzado'),
    ],
    options: ['hablar', 'aparcan', 'callar'],
    correct: 'aparcan',
  }),
  card('aw_t1', 'ausencia_whatsapp', {
    eras: ['tarde'], room: 'media', frame: 'Crisis de clip',
    signals: [
      sig('El war room digital te ha muteado', 'dominant'),
      sig('Solo te llega el grupo de «comunidad»', 'support'),
      sig('Tu clip antiguo vuelve a circular', 'noise', 'atril'),
    ],
    options: ['queman', 'aparcan', 'rumor_trampa'],
    correct: 'aparcan',
    requireFlags: ['destino_naranja'],
  }),
  card('aw_t2', 'ausencia_whatsapp', {
    eras: ['tarde'], room: 'aparato', frame: 'Lista final',
    signals: [
      sig('El chat que cierra listas te ignora', 'dominant'),
      sig('Te escriben solo para «agradecer el ciclo»', 'support'),
      sig('Hay abrazos en el pasillo', 'noise'),
    ],
    options: ['aparcan', 'ascienden', 'callar'],
    correct: 'aparcan',
  }),
];
