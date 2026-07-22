import type { SalaCard } from '../../../types';
import { card, sig } from '../_helpers';

/** Regla: Silencio del jefe + barones en movimiento = guerra */
export const R05: SalaCard[] = [
  card('sb_z1', 'silencio_barones', {
    eras: ['zap'], room: 'faccion', frame: 'Federación en ebullición',
    signals: [
      sig('Zapatero no comenta el conflicto', 'dominant'),
      sig('Dos barones cenan sin cámaras', 'support'),
      sig('La prensa habla de «unidad»', 'noise', 'atril'),
    ],
    options: ['callar', 'mensajero', 'ascienden'],
    correct: 'mensajero',
  }),
  card('sb_z2', 'silencio_barones', {
    eras: ['zap'], room: 'aparato', frame: 'Comité territorial',
    signals: [
      sig('El líder nacional mira el techo', 'dominant'),
      sig('Los territoriales se reparten gestos', 'support'),
      sig('Te ofrecen agua y asiento cómodo', 'noise'),
    ],
    options: ['mensajero', 'aparcan', 'rumor_trampa'],
    correct: 'mensajero',
  }),
  card('sb_r1', 'silencio_barones', {
    eras: ['rajoy'], room: 'faccion', frame: 'Génova en pausa',
    signals: [
      sig('Rajoy no arbitra en público', 'dominant'),
      sig('Aguirre y otros mueven fichas', 'support'),
      sig('Hay sondeos que «tranquilizan»', 'noise'),
    ],
    options: ['callar', 'mensajero', 'hablar'],
    correct: 'mensajero',
  }),
  card('sb_r2', 'silencio_barones', {
    eras: ['rajoy'], room: 'intimidad', frame: 'Cena de tres',
    signals: [
      sig('El presidente no responde al mensaje', 'dominant'),
      sig('Dos barones te piden «llevar un recado»', 'support'),
      sig('Te ponen el mejor vino', 'noise', 'fontanero'),
    ],
    options: ['usan', 'mensajero', 'aparcan'],
    correct: 'mensajero',
  }),
  card('sb_b1', 'silencio_barones', {
    eras: ['bloqueo'], room: 'faccion', frame: 'Hotel de investidura',
    signals: [
      sig('El candidato sonríe y no decide', 'dominant'),
      sig('Las federaciones negocian por pasillos', 'support'),
      sig('Un tuit habla de «histórico acuerdo»', 'noise', 'atril'),
    ],
    options: ['mensajero', 'rumor_trampa', 'ascienden'],
    correct: 'mensajero',
  }),
  card('sb_b2', 'silencio_barones', {
    eras: ['bloqueo'], room: 'aparato', frame: 'Primarias · noche',
    signals: [
      sig('La dirección nacional calla 48 horas', 'dominant'),
      sig('Los barones llaman a delegados', 'support'),
      sig('Hay playlist motivacional en el hall', 'noise'),
    ],
    options: ['callar', 'mensajero', 'queman'],
    correct: 'mensajero',
  }),
  card('sb_s1', 'silencio_barones', {
    eras: ['sanchez'], room: 'faccion', frame: 'Crisis de coalición',
    signals: [
      sig('Moncloa no aclara el frente interno', 'dominant'),
      sig('Barones autonómicos se reúnen solos', 'support'),
      sig('Un editorial pide «serenidad»', 'noise', 'cruzado'),
    ],
    options: ['mensajero', 'hablar', 'aparcan'],
    correct: 'mensajero',
  }),
  card('sb_s2', 'silencio_barones', {
    eras: ['sanchez'], room: 'institucional', frame: 'Senado · corrillo',
    signals: [
      sig('El jefe de fila no toma partido', 'dominant'),
      sig('Tres territorios te piden mediación', 'support'),
      sig('Te fotografían como «puente»', 'noise', 'atril'),
    ],
    options: ['ascienden', 'mensajero', 'usan'],
    correct: 'mensajero',
  }),
  card('sb_t1', 'silencio_barones', {
    eras: ['tarde'], room: 'faccion', frame: 'Congreso del partido',
    signals: [
      sig('La mesa presidencial no habla del cisma', 'dominant'),
      sig('Los barones cuentan votos en la cafetería', 'support'),
      sig('Hay globos y eslogan nuevo', 'noise'),
    ],
    options: ['mensajero', 'callar', 'rumor_trampa'],
    correct: 'mensajero',
  }),
  card('sb_t2', 'silencio_barones', {
    eras: ['tarde'], room: 'aparato', frame: 'Lista europea',
    signals: [
      sig('El líder no publica criterio', 'dominant'),
      sig('Las federaciones pelean puestos', 'support'),
      sig('Te ofrecen un viaje a Bruselas «de estudio»', 'noise', 'fontanero'),
    ],
    options: ['ascienden', 'mensajero', 'aparcan'],
    correct: 'mensajero',
  }),
];
