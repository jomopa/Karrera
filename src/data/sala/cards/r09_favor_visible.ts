import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Favor público pequeño + deuda grande = te usan */
export const R09: SalaCard[] = [
  card('fv_z1', 'favor_visible', {
    eras: ['zap'], room: 'aparato', frame: 'Lista municipal',
    signals: [
      sig('Te cuelan un puesto bajo y visible', 'dominant'),
      sig('Te piden «lealtad total» a cambio', 'support'),
      sig('La foto en el mitin es muy bonita', 'noise', 'atril'),
    ],
    options: ['ascienden', 'usan', 'hablar'],
    correct: 'usan',
  }),
  card('fv_z2', 'favor_visible', {
    eras: ['zap'], room: 'calle', frame: 'Acto de barrio',
    signals: [
      sig('Te dan un minuto de micrófono', 'dominant'),
      sig('Después te piden tres favores pesados', 'support'),
      sig('La gente te aplaude', 'noise', 'cruzado'),
    ],
    options: ['usan', 'queman', 'aparcan'],
    correct: 'usan',
  }),
  card('fv_r1', 'favor_visible', {
    eras: ['rajoy'], room: 'institucional', frame: 'Comisión menor',
    signals: [
      sig('Te dan una vocalía simbólica', 'dominant'),
      sig('Te exigen votos difíciles en silencio', 'support'),
      sig('El cargo suena bien en el currículum', 'noise'),
    ],
    options: ['ascienden', 'usan', 'callar'],
    correct: 'usan',
  }),
  card('fv_r2', 'favor_visible', {
    eras: ['rajoy'], room: 'media', frame: 'Tertulia local',
    signals: [
      sig('Te colocan en un programa menor', 'dominant'),
      sig('Debes defender el guion más tóxico', 'support'),
      sig('El productor te llama «fichaje»', 'noise', 'atril'),
    ],
    options: ['hablar', 'usan', 'queman'],
    correct: 'usan',
  }),
  card('fv_b1', 'favor_visible', {
    eras: ['bloqueo'], room: 'faccion', frame: 'Primarias',
    signals: [
      sig('Te ponen en un acto de campaña chico', 'dominant'),
      sig('Debes traer delegados a cambio', 'support'),
      sig('Te dan camiseta y abrazo', 'noise'),
    ],
    options: ['usan', 'mensajero', 'ascienden'],
    correct: 'usan',
  }),
  card('fv_b2', 'favor_visible', {
    eras: ['bloqueo'], room: 'aparato', frame: 'Coalición',
    signals: [
      sig('Te ofrecen un cargo de escaparate', 'dominant'),
      sig('El precio es callar en la negociación seria', 'support'),
      sig('Hay nota de prensa con tu nombre', 'noise', 'atril'),
    ],
    options: ['aparcan', 'usan', 'callar'],
    correct: 'usan',
  }),
  card('fv_s1', 'favor_visible', {
    eras: ['sanchez'], room: 'institucional', frame: 'Gabinete segundo',
    signals: [
      sig('Te dan un cargo sin presupuesto', 'dominant'),
      sig('Debes firmar lo que otros negocian', 'support'),
      sig('La tarjeta de visita impresiona', 'noise'),
    ],
    options: ['ascienden', 'usan', 'rumor_trampa'],
    correct: 'usan',
  }),
  card('fv_s2', 'favor_visible', {
    eras: ['sanchez'], room: 'media', frame: 'Rueda de prensa',
    signals: [
      sig('Te dejan leer un párrafo', 'dominant'),
      sig('El párrafo es el más impopular', 'support'),
      sig('Salen bien en la foto de familia', 'noise', 'fontanero'),
    ],
    options: ['hablar', 'usan', 'queman'],
    correct: 'usan',
  }),
  card('fv_t1', 'favor_visible', {
    eras: ['tarde'], room: 'calle', frame: 'Lista simbólica',
    signals: [
      sig('Te ponen de número decorativo', 'dominant'),
      sig('Debes movilizar a tu red entera', 'support'),
      sig('Hay cartel con tu cara sonriente', 'noise', 'atril'),
    ],
    options: ['usan', 'ascienden', 'aparcan'],
    correct: 'usan',
    requireFlags: ['sol'],
  }),
  card('fv_t2', 'favor_visible', {
    eras: ['tarde'], room: 'intimidad', frame: 'Favor de mentor',
    signals: [
      sig('Te arreglan un papel pequeño', 'dominant'),
      sig('Te recuerdan «lo que te debo… al revés»', 'support'),
      sig('Suena a afecto genuino', 'noise', 'cruzado'),
    ],
    options: ['callar', 'usan', 'hablar'],
    correct: 'usan',
  }),
];
