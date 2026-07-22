import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: «Ya hablaremos» / responsabilidad = no */
export const R03: SalaCard[] = [
  card('eu_z1', 'eufemismo_no', {
    eras: ['zap'], room: 'aparato', frame: 'Tras pedir plaza',
    signals: [
      sig('Te dicen «ya hablaremos» con sonrisa', 'dominant'),
      sig('No hay follow-up en la agenda', 'support'),
      sig('Un amigo insiste: «está hecho»', 'noise'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('eu_z2', 'eufemismo_no', {
    eras: ['zap'], room: 'institucional', frame: 'Despacho de consejero',
    signals: [
      sig('«Es un tema de responsabilidad»', 'dominant'),
      sig('Te cambian de tema en 12 segundos', 'support'),
      sig('Hay café bueno y galletas', 'noise', 'fontanero'),
    ],
    options: ['callar', 'aparcan', 'ascienden'],
    correct: 'aparcan',
  }),
  card('eu_r1', 'eufemismo_no', {
    eras: ['rajoy'], room: 'aparato', frame: 'Génova · espera',
    signals: [
      sig('«Lo estudiaremos con calma»', 'dominant'),
      sig('Tu expediente vuelve al mismo cajón', 'support'),
      sig('Rajoy no bocea: casi un sí', 'noise'),
    ],
    options: ['aparcan', 'callar', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('eu_r2', 'eufemismo_no', {
    eras: ['rajoy'], room: 'media', frame: 'Off the record',
    signals: [
      sig('«No es el momento de tu perfil»', 'dominant'),
      sig('Te prometen «otra ventana» sin mes', 'support'),
      sig('Un columnista te pone en la quiniela', 'noise', 'atril'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('eu_b1', 'eufemismo_no', {
    eras: ['bloqueo'], room: 'faccion', frame: 'Negociación de listas',
    signals: [
      sig('«Hay que ser responsables con el conjunto»', 'dominant'),
      sig('Tu cuota desaparece del Excel', 'support'),
      sig('Te abrazan en el pasillo', 'noise'),
    ],
    options: ['aparcan', 'usan', 'mensajero'],
    correct: 'aparcan',
  }),
  card('eu_b2', 'eufemismo_no', {
    eras: ['bloqueo'], room: 'intimidad', frame: 'Llamada de mentor',
    signals: [
      sig('«Confío en ti… más adelante»', 'dominant'),
      sig('Corta la llamada sin compromiso', 'support'),
      sig('Te reenvía un artículo motivacional', 'noise', 'cruzado'),
    ],
    options: ['callar', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
  card('eu_s1', 'eufemismo_no', {
    eras: ['sanchez'], room: 'aparato', frame: 'Ferraz · pasillo',
    signals: [
      sig('«El ciclo pide paciencia»', 'dominant'),
      sig('La puerta del despacho serio no se abre', 'support'),
      sig('Un sanchista te guiña el ojo', 'noise', 'fontanero'),
    ],
    options: ['ascienden', 'aparcan', 'callar'],
    correct: 'aparcan',
  }),
  card('eu_s2', 'eufemismo_no', {
    eras: ['sanchez'], room: 'institucional', frame: 'Moncloa · antecámara',
    signals: [
      sig('«Lo valoramos en clave de país»', 'dominant'),
      sig('Te devuelven al coche sin carpeta', 'support'),
      sig('Hay foto protocolaria tuya en el hall', 'noise', 'atril'),
    ],
    options: ['aparcan', 'queman', 'ascienden'],
    correct: 'aparcan',
  }),
  card('eu_t1', 'eufemismo_no', {
    eras: ['tarde'], room: 'media', frame: 'Productora',
    signals: [
      sig('«Encajas, pero no ahora»', 'dominant'),
      sig('El casting sigue sin devolverte mail', 'support'),
      sig('Tu clip tiene buenas métricas', 'noise', 'atril'),
    ],
    options: ['hablar', 'aparcan', 'rumor_trampa'],
    correct: 'aparcan',
  }),
  card('eu_t2', 'eufemismo_no', {
    eras: ['tarde'], room: 'calle', frame: 'Asamblea local',
    signals: [
      sig('«Hay que pensar en la unidad»', 'dominant'),
      sig('La moción sobre tu cargo se aparca', 'support'),
      sig('Te ovacionan 8 segundos', 'noise', 'cruzado'),
    ],
    options: ['ascienden', 'aparcan', 'hablar'],
    correct: 'aparcan',
  }),
];
