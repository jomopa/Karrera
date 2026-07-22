import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Micrófono tras tu fallo = fusible mediático */
export const R04: SalaCard[] = [
  card('mf_z1', 'micro_fusible', {
    eras: ['zap'], room: 'media', frame: 'Día después del error',
    signals: [
      sig('Te ofrecen el primer micro de la mañana', 'dominant'),
      sig('Ayer tu frase salió torcida en todos lados', 'support'),
      sig('El jefe dice «confío en ti» en voz alta', 'noise', 'fontanero'),
    ],
    options: ['hablar', 'queman', 'ascienden'],
    correct: 'queman',
  }),
  card('mf_z2', 'micro_fusible', {
    eras: ['zap'], room: 'calle', frame: 'Rueda de prensa exprés',
    signals: [
      sig('Solo tú sales a dar la cara', 'dominant'),
      sig('El resto del equipo desaparece', 'support'),
      sig('Hay aplausos de militantes en la puerta', 'noise', 'cruzado'),
    ],
    options: ['queman', 'usan', 'callar'],
    correct: 'queman',
  }),
  card('mf_r1', 'micro_fusible', {
    eras: ['rajoy'], room: 'media', frame: 'Antena 3 · mañana',
    signals: [
      sig('Te meten en el primer bloque a pecho descubierto', 'dominant'),
      sig('El escándalo lleva tu apellido mal escrito', 'support'),
      sig('Te maquillan «para que salgas bien»', 'noise', 'atril'),
    ],
    options: ['hablar', 'queman', 'rumor_trampa'],
    correct: 'queman',
  }),
  card('mf_r2', 'micro_fusible', {
    eras: ['rajoy'], room: 'institucional', frame: 'Tras el BOE torcido',
    signals: [
      sig('Te toca explicar lo inexplicable', 'dominant'),
      sig('El ministro no aparece', 'support'),
      sig('Te dan un atril nuevo y bonito', 'noise', 'atril'),
    ],
    options: ['queman', 'aparcan', 'callar'],
    correct: 'queman',
  }),
  card('mf_b1', 'micro_fusible', {
    eras: ['bloqueo'], room: 'media', frame: 'Primarias · clip',
    signals: [
      sig('Te piden «aclarar» en cámara tras el fallo', 'dominant'),
      sig('El rival ya tiene el montaje listo', 'support'),
      sig('Tu equipo celebra el «tiempo en antena»', 'noise'),
    ],
    options: ['hablar', 'queman', 'usan'],
    correct: 'queman',
  }),
  card('mf_b2', 'micro_fusible', {
    eras: ['bloqueo'], room: 'aparato', frame: 'War room',
    signals: [
      sig('Te asignan el mensaje más tóxico', 'dominant'),
      sig('Nadie más quiere ese guion', 'support'),
      sig('Te llaman «valiente» en el pasillo', 'noise', 'cruzado'),
    ],
    options: ['queman', 'mensajero', 'ascienden'],
    correct: 'queman',
  }),
  card('mf_s1', 'micro_fusible', {
    eras: ['sanchez'], room: 'media', frame: 'Crisis de coalición',
    signals: [
      sig('Sales tú a defender lo indefendible', 'dominant'),
      sig('Los números dos se esconden', 'support'),
      sig('Hay trending a tu favor 11 minutos', 'noise', 'atril'),
    ],
    options: ['queman', 'hablar', 'usan'],
    correct: 'queman',
  }),
  card('mf_s2', 'micro_fusible', {
    eras: ['sanchez'], room: 'calle', frame: 'Puerta del hospital',
    signals: [
      sig('Te mandan al foco del error sanitario', 'dominant'),
      sig('El consejero viaja «por agenda»', 'support'),
      sig('Te reciben con flores simbólicas', 'noise'),
    ],
    options: ['callar', 'queman', 'aparcan'],
    correct: 'queman',
  }),
  card('mf_t1', 'micro_fusible', {
    eras: ['tarde'], room: 'media', frame: 'Directo en redes',
    signals: [
      sig('Te piden un live «para explicar»', 'dominant'),
      sig('El clip malo ya supera el millón', 'support'),
      sig('El community dice «engagement brutal»', 'noise', 'atril'),
    ],
    options: ['hablar', 'queman', 'rumor_trampa'],
    correct: 'queman',
  }),
  card('mf_t2', 'micro_fusible', {
    eras: ['tarde'], room: 'institucional', frame: 'Comisión incómoda',
    signals: [
      sig('Te sientan solo ante el micrófono largo', 'dominant'),
      sig('Los jefes observan desde la tribuna', 'support'),
      sig('Te felicitan por «transparencia»', 'noise', 'fontanero'),
    ],
    options: ['queman', 'callar', 'ascienden'],
    correct: 'queman',
  }),
];
