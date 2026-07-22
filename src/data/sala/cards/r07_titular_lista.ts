import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Titular alegre + lista muda = manda la lista */
export const R07: SalaCard[] = [
  card('tl_z1', 'titular_lista', {
    eras: ['zap'], room: 'media', frame: 'Portada amable',
    signals: [
      sig('El titular te pone «en alza»', 'noise', 'atril'),
      sig('La lista municipal no te nombra', 'dominant'),
      sig('El aparato no desmiente ni confirma', 'support'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('tl_z2', 'titular_lista', {
    eras: ['zap'], room: 'aparato', frame: 'Agrupación',
    signals: [
      sig('Un diario local te corona', 'noise'),
      sig('El censo de puestos sigue cerrado', 'dominant'),
      sig('Nadie te llama para «cuadrar»', 'support'),
    ],
    options: ['aparcan', 'rumor_trampa', 'usan'],
    correct: 'aparcan',
  }),
  card('tl_r1', 'titular_lista', {
    eras: ['rajoy'], room: 'media', frame: 'ABC / El Mundo',
    signals: [
      sig('Te citan como «valor en alza»', 'noise', 'atril'),
      sig('La lista al Congreso no se mueve', 'dominant'),
      sig('Génova no te cita en el briefing', 'support'),
    ],
    options: ['ascienden', 'aparcan', 'callar'],
    correct: 'aparcan',
  }),
  card('tl_r2', 'titular_lista', {
    eras: ['rajoy'], room: 'institucional', frame: 'Grupo parlamentario',
    signals: [
      sig('Hay rumor de promoción en el pasillo', 'noise'),
      sig('El orden del día te ignora', 'dominant'),
      sig('El jefe de fila no te mira', 'support'),
    ],
    options: ['aparcan', 'hablar', 'queman'],
    correct: 'aparcan',
  }),
  card('tl_b1', 'titular_lista', {
    eras: ['bloqueo'], room: 'media', frame: 'Noche de tertulia',
    signals: [
      sig('Te ponen en la quiniela del gobierno', 'noise', 'atril'),
      sig('Las listas de coalición ya están firmadas', 'dominant'),
      sig('Tu nombre no está en ningún PDF', 'support'),
    ],
    options: ['ascienden', 'aparcan', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('tl_b2', 'titular_lista', {
    eras: ['bloqueo'], room: 'faccion', frame: 'Primarias mediáticas',
    signals: [
      sig('Un medio te vende como ganador', 'noise'),
      sig('Los compromisarios no te cuentan', 'dominant'),
      sig('El Excel de delegados te omite', 'support'),
    ],
    options: ['aparcan', 'mensajero', 'hablar'],
    correct: 'aparcan',
  }),
  card('tl_s1', 'titular_lista', {
    eras: ['sanchez'], room: 'media', frame: 'Hilo viral',
    signals: [
      sig('El hilo dice que «te ascienden»', 'noise', 'atril'),
      sig('Ferraz no ha movido el organigrama', 'dominant'),
      sig('Tu carnet sigue en el mismo cajón', 'support'),
    ],
    options: ['ascienden', 'aparcan', 'usan'],
    correct: 'aparcan',
  }),
  card('tl_s2', 'titular_lista', {
    eras: ['sanchez'], room: 'aparato', frame: 'Remodelación',
    signals: [
      sig('La filtración te nombra ministro', 'noise'),
      sig('El BOE sale sin tu apellido', 'dominant'),
      sig('El fontanero no te ha escrito', 'support'),
    ],
    options: ['aparcan', 'rumor_trampa', 'callar'],
    correct: 'aparcan',
    requireFlags: ['disciplina'],
  }),
  card('tl_t1', 'titular_lista', {
    eras: ['tarde'], room: 'media', frame: 'Newsletter política',
    signals: [
      sig('Te incluyen en «los que vienen»', 'noise', 'atril'),
      sig('La lista europea ya está cerrada', 'dominant'),
      sig('No hay mail de confirmación', 'support'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('tl_t2', 'titular_lista', {
    eras: ['tarde'], room: 'calle', frame: 'Asamblea con prensa',
    signals: [
      sig('El cronista te da por fichado', 'noise'),
      sig('La pizarra de cargos no te incluye', 'dominant'),
      sig('El secretario evita tu mirada', 'support'),
    ],
    options: ['aparcan', 'queman', 'usan'],
    correct: 'aparcan',
  }),
];
