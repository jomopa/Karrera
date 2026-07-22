import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Bronca pública + llamada privada = te necesitan */
export const R02: SalaCard[] = [
  card('bc_z1', 'bronca_llamada', {
    eras: ['zap'], room: 'media', frame: 'Tras el telediario',
    signals: [
      sig('Te afean en abierto por «desafecto»', 'dominant'),
      sig('A las 23:40 te llaman «para hablar»', 'support'),
      sig('Tu madre te dice que dimitas', 'noise'),
    ],
    options: ['queman', 'usan', 'callar'],
    correct: 'usan',
  }),
  card('bc_z2', 'bronca_llamada', {
    eras: ['zap'], room: 'aparato', frame: 'Comité federal',
    signals: [
      sig('Te señalan en la mesa como problema', 'dominant'),
      sig('Después te piden un café a solas', 'support'),
      sig('Un rival tuitea tu epitafio', 'noise', 'atril'),
    ],
    options: ['aparcan', 'usan', 'queman'],
    correct: 'usan',
  }),
  card('bc_r1', 'bronca_llamada', {
    eras: ['rajoy'], room: 'calle', frame: 'Mitin torcido',
    signals: [
      sig('Te corrigen el guion delante de todos', 'dominant'),
      sig('El jefe de campaña te escribe en privado', 'support'),
      sig('La base te abuchea un poco', 'noise', 'cruzado'),
    ],
    options: ['queman', 'usan', 'hablar'],
    correct: 'usan',
  }),
  card('bc_r2', 'bronca_llamada', {
    eras: ['rajoy'], room: 'faccion', frame: 'Guerra de barones',
    signals: [
      sig('Un barón te pone de ejemplo malo', 'dominant'),
      sig('Otro barón te llama «esta noche»', 'support'),
      sig('El BOE te ignora del todo', 'noise', 'fontanero'),
    ],
    options: ['mensajero', 'usan', 'aparcan'],
    correct: 'usan',
  }),
  card('bc_b1', 'bronca_llamada', {
    eras: ['bloqueo'], room: 'media', frame: 'Debate a cuatro',
    signals: [
      sig('Te usan de piñata en antena', 'dominant'),
      sig('Off the record te piden «aguantar»', 'support'),
      sig('El hashtag pide tu cabeza', 'noise', 'atril'),
    ],
    options: ['queman', 'usan', 'callar'],
    correct: 'usan',
  }),
  card('bc_b2', 'bronca_llamada', {
    eras: ['bloqueo'], room: 'aparato', frame: 'Primarias envenenadas',
    signals: [
      sig('El aparato te marca en un corrillo', 'dominant'),
      sig('A medianoche te ofrecen «un papel útil»', 'support'),
      sig('Te borran del grupo grande', 'noise'),
    ],
    options: ['aparcan', 'usan', 'rumor_trampa'],
    correct: 'usan',
  }),
  card('bc_s1', 'bronca_llamada', {
    eras: ['sanchez'], room: 'institucional', frame: 'Tras el Consejo',
    signals: [
      sig('Te afean el tono en la rueda de prensa', 'dominant'),
      sig('Un secretario te cita «sin actas»', 'support'),
      sig('La oposición celebra tu caída', 'noise'),
    ],
    options: ['queman', 'usan', 'callar'],
    correct: 'usan',
  }),
  card('bc_s2', 'bronca_llamada', {
    eras: ['sanchez'], room: 'intimidad', frame: 'WhatsApp del núcleo',
    signals: [
      sig('Te llaman «ruido» en el chat visible', 'dominant'),
      sig('Te escriben por otro hilo: «te necesitamos»', 'support'),
      sig('Un meme te convierte en hazmerreír', 'noise', 'atril'),
    ],
    options: ['usan', 'queman', 'aparcan'],
    correct: 'usan',
  }),
  card('bc_t1', 'bronca_llamada', {
    eras: ['tarde'], room: 'media', frame: 'Podcast hostil',
    signals: [
      sig('Te desmontan en 40 minutos', 'dominant'),
      sig('El productor te llama: «vuelve la semana»', 'support'),
      sig('Los comments piden cancelación', 'noise', 'cruzado'),
    ],
    options: ['queman', 'usan', 'hablar'],
    correct: 'usan',
  }),
  card('bc_t2', 'bronca_llamada', {
    eras: ['tarde'], room: 'aparato', frame: 'Comité de crisis',
    signals: [
      sig('Te echan la culpa del titular', 'dominant'),
      sig('Te piden «gestionar el fuego» en privado', 'support'),
      sig('Te ofrecen una fundación de consuelo', 'noise', 'fontanero'),
    ],
    options: ['aparcan', 'usan', 'callar'],
    correct: 'usan',
  }),
];
