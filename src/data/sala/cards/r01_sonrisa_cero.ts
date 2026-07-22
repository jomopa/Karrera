import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Sonrisa de aparato + cero encargo = aparcamiento */
export const R01: SalaCard[] = [
  card('sc_z1', 'sonrisa_cero', {
    eras: ['zap'], room: 'aparato', frame: 'Pasillo · Ferraz',
    signals: [
      sig('Un federal te sonríe demasiado', 'dominant'),
      sig('Nadie menciona tu nombre para la lista', 'support'),
      sig('En la tele dicen que «vienes fuerte»', 'noise', 'atril'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('sc_z2', 'sonrisa_cero', {
    eras: ['zap'], room: 'intimidad', frame: 'Cena con barón',
    signals: [
      sig('El barón brinda por ti', 'dominant'),
      sig('No hay fecha para «el siguiente paso»', 'support'),
      sig('Tu primo dice que ya lo tienes', 'noise'),
    ],
    options: ['ascienden', 'aparcan', 'usan'],
    correct: 'aparcan',
  }),
  card('sc_r1', 'sonrisa_cero', {
    eras: ['rajoy'], room: 'aparato', frame: 'Génova · ascensor',
    signals: [
      sig('Cospedal te dedica media sonrisa', 'dominant'),
      sig('Tu despacho sigue sin cartel nuevo', 'support'),
      sig('Un periodista te pide perfil de «estrella»', 'noise', 'atril'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('sc_r2', 'sonrisa_cero', {
    eras: ['rajoy'], room: 'institucional', frame: 'Antes del pleno',
    signals: [
      sig('El portavoz te saluda como a un mueble querido', 'dominant'),
      sig('Te dejan fuera del turno de palabra', 'support'),
      sig('Hay aplauso educado cuando pasas', 'noise'),
    ],
    options: ['aparcan', 'queman', 'callar'],
    correct: 'aparcan',
  }),
  card('sc_b1', 'sonrisa_cero', {
    eras: ['bloqueo'], room: 'faccion', frame: 'Hotel de congreso',
    signals: [
      sig('Los dos bandos te sonríen en el mismo pasillo', 'dominant'),
      sig('Ninguno te pide el voto en serio', 'support'),
      sig('Te ofrecen micrófono «por si acaso»', 'noise', 'atril'),
    ],
    options: ['mensajero', 'aparcan', 'ascienden'],
    correct: 'aparcan',
  }),
  card('sc_b2', 'sonrisa_cero', {
    eras: ['bloqueo'], room: 'media', frame: 'Tertulia previa',
    signals: [
      sig('El productor te trata como VIP', 'dominant'),
      sig('No hay silla con tu nombre en el set serio', 'support'),
      sig('Trending: «fichaje del año» con tu cara', 'noise', 'atril'),
    ],
    options: ['ascienden', 'aparcan', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('sc_s1', 'sonrisa_cero', {
    eras: ['sanchez'], room: 'aparato', frame: 'Ferraz · 2:14',
    signals: [
      sig('Un fontanero te manda un emoji de sol', 'dominant'),
      sig('La lista circula sin tu apellido', 'support'),
      sig('Te citan en un hilo como «imprescindible»', 'noise'),
    ],
    options: ['aparcan', 'usan', 'ascienden'],
    correct: 'aparcan',
    requireFlags: ['disciplina'],
  }),
  card('sc_s2', 'sonrisa_cero', {
    eras: ['sanchez'], room: 'calle', frame: 'Mitin de relleno',
    signals: [
      sig('Te ponen en primera fila a sonreír', 'dominant'),
      sig('Cero minutos de discurso', 'support'),
      sig('La base te pide selfie como a un líder', 'noise', 'cruzado'),
    ],
    options: ['hablar', 'aparcan', 'ascienden'],
    correct: 'aparcan',
  }),
  card('sc_t1', 'sonrisa_cero', {
    eras: ['tarde'], room: 'institucional', frame: 'Bruselas · café',
    signals: [
      sig('Un jefe de gabinete te dedica tiempo', 'dominant'),
      sig('No hay dossier con tu nombre encima', 'support'),
      sig('LinkedIn te felicita por «proyección europea»', 'noise', 'atril'),
    ],
    options: ['ascienden', 'aparcan', 'callar'],
    correct: 'aparcan',
  }),
  card('sc_t2', 'sonrisa_cero', {
    eras: ['tarde'], room: 'aparato', frame: 'Lista a puerta cerrada',
    signals: [
      sig('Te abren la puerta con cortesía excesiva', 'dominant'),
      sig('El borrador de lista no te incluye', 'support'),
      sig('Un asesor dice «tranquilo, estás dentro»', 'noise', 'fontanero'),
    ],
    options: ['aparcan', 'rumor_trampa', 'ascienden'],
    correct: 'aparcan',
  }),
];
