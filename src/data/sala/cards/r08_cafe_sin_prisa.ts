import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Café sin prisa + cero fecha = aparcamiento */
export const R08: SalaCard[] = [
  card('cf_z1', 'cafe_sin_prisa', {
    eras: ['zap'], room: 'intimidad', frame: 'Cafetería cerca de Ferraz',
    signals: [
      sig('Te proponen café «sin prisa»', 'dominant'),
      sig('No hay día en la agenda compartida', 'support'),
      sig('El tono es cálido y familiar', 'noise'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('cf_z2', 'cafe_sin_prisa', {
    eras: ['zap'], room: 'aparato', frame: 'Despacho con sofá',
    signals: [
      sig('«Cuando quieras hablamos largo»', 'dominant'),
      sig('La secretaria no bloquea hueco', 'support'),
      sig('Hay galletas y foto de familia', 'noise', 'fontanero'),
    ],
    options: ['aparcan', 'callar', 'usan'],
    correct: 'aparcan',
  }),
  card('cf_r1', 'cafe_sin_prisa', {
    eras: ['rajoy'], room: 'intimidad', frame: 'Bar de Génova',
    signals: [
      sig('Te invitan a «tomar algo un día»', 'dominant'),
      sig('Ese día nunca llega al calendario', 'support'),
      sig('Te tratan de usted con cariño', 'noise'),
    ],
    options: ['ascienden', 'aparcan', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('cf_r2', 'cafe_sin_prisa', {
    eras: ['rajoy'], room: 'institucional', frame: 'Antes del pleno',
    signals: [
      sig('«Quedamos tranquilos la semana que viene»', 'dominant'),
      sig('La semana que viene ya está llena', 'support'),
      sig('Te dejan el mejor asiento del corrillo', 'noise'),
    ],
    options: ['aparcan', 'hablar', 'callar'],
    correct: 'aparcan',
  }),
  card('cf_b1', 'cafe_sin_prisa', {
    eras: ['bloqueo'], room: 'faccion', frame: 'Hotel de negociación',
    signals: [
      sig('«Hablamos con calma, sin reloj»', 'dominant'),
      sig('El reloj de investidura sí corre — sin ti', 'support'),
      sig('Te sirven un café excelente', 'noise'),
    ],
    options: ['mensajero', 'aparcan', 'ascienden'],
    correct: 'aparcan',
  }),
  card('cf_b2', 'cafe_sin_prisa', {
    eras: ['bloqueo'], room: 'media', frame: 'Off en terraza',
    signals: [
      sig('El periodista propone «otro día más largo»', 'dominant'),
      sig('No hay grabadora ni fecha', 'support'),
      sig('Dice que tu perfil «interesa»', 'noise', 'atril'),
    ],
    options: ['hablar', 'aparcan', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('cf_s1', 'cafe_sin_prisa', {
    eras: ['sanchez'], room: 'aparato', frame: 'Ferraz · sofá',
    signals: [
      sig('«Quedamos sin agenda, a gusto»', 'dominant'),
      sig('Tu nombre no entra en el Outlook serio', 'support'),
      sig('Te mandan un sticker de ánimo', 'noise'),
    ],
    options: ['aparcan', 'usan', 'callar'],
    correct: 'aparcan',
  }),
  card('cf_s2', 'cafe_sin_prisa', {
    eras: ['sanchez'], room: 'intimidad', frame: 'Llamada amable',
    signals: [
      sig('«Cuando puedas, un café»', 'dominant'),
      sig('Cuelga sin concretar barrio ni hora', 'support'),
      sig('Suena a amistad verdadera', 'noise', 'cruzado'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('cf_t1', 'cafe_sin_prisa', {
    eras: ['tarde'], room: 'institucional', frame: 'Bruselas · lounge',
    signals: [
      sig('«Hablamos sin reloj europeo»', 'dominant'),
      sig('Tu badge no abre la sala de verdad', 'support'),
      sig('El espresso es impecable', 'noise', 'fontanero'),
    ],
    options: ['aparcan', 'ascienden', 'callar'],
    correct: 'aparcan',
  }),
  card('cf_t2', 'cafe_sin_prisa', {
    eras: ['tarde'], room: 'calle', frame: 'Barrio · terraza',
    signals: [
      sig('El concejal propone café «cuando se pueda»', 'dominant'),
      sig('La comisión que pedías no se convoca', 'support'),
      sig('Paga él y sonríe mucho', 'noise'),
    ],
    options: ['usan', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
];
