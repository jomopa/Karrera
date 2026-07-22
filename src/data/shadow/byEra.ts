import type { ShadowOffer } from '../../types';
import { S } from './_helpers';

/** Clima de era: ambientan el pitch sin sustituir la hemeroteca. */
export const SHADOW_BY_ERA: ShadowOffer[] = [
  S('era_liquidez', {
    theme: 'corrupcion',
    eras: ['zap'],
    bands: ['low', 'mid'],
    title: 'Liquidez creativa',
    pitch:
      'Mientras el Gobierno habla de liquidez, un intermediario te ofrece liquidez de verdad: un contrato «anticrisis» con margen.',
    win: {
      punch: 'El margen llega. La crisis, también… pero no a tu cuenta.',
      stim: ['Anticrisis'],
    },
    lose: {
      punch: 'El contrato se investiga. «Anticrisis» suena a estafa con corbata.',
      stim: ['Estafa'],
    },
    setFlagsWin: ['caja_b'],
  }),
  S('era_15m', {
    theme: 'filtracion',
    eras: ['zap'],
    personalities: ['cruzado', 'atril'],
    title: 'Acampada y carnet',
    pitch:
      'En la plaza te reconocen. Un medio quiere «el político que duda». Filtrar dudas puede hacerte héroe… o hereje.',
    win: {
      punch: 'La duda te pone en el mapa. El carnet cruje, pero aguanta.',
      stim: ['Plaza'],
    },
    lose: {
      punch: 'El aparato te lee el acta de desafecto. La plaza no te ficha.',
      stim: ['Desafecto'],
    },
  }),
  S('era_rescate', {
    theme: 'chantaje',
    eras: ['rajoy'],
    bands: ['mid', 'high'],
    title: 'Off del rescate',
    pitch:
      'Alguien tiene el número real antes de que tenga otro nombre. Te piden silencio mediático a cambio de un salto en comunicación.',
    win: {
      punch: 'Callas. Te ascienden a «mensaje». El número sale igual, sin tu huella.',
      stim: ['Mensaje'],
    },
    lose: {
      punch: 'Callas… y te atribuyen el off. Doble mentira, un solo chivo.',
      stim: ['Chivo'],
    },
  }),
  S('era_guertel', {
    theme: 'caja_b',
    eras: ['rajoy', 'bloqueo'],
    parties: ['pp'],
    bands: ['mid', 'high', 'top'],
    title: 'Sombra de la Gürtel',
    pitch:
      'El sumario avanza. Te ofrecen «estar fuera del papel» a cambio de un favor orgánico ahora.',
    win: {
      punch: 'Quedas fuera del papel. Dentro del favor. El poder prefiere esa geometría.',
      stim: ['Sumario'],
    },
    lose: {
      punch: 'El favor no basta. Un correo te acerca al sumario por rebote.',
      stim: ['Correo'],
    },
    weight: 12,
  }),
  S('era_bloqueo', {
    theme: 'traicion',
    eras: ['bloqueo'],
    bands: ['mid', 'high', 'top'],
    title: 'Investidura en la sombra',
    pitch:
      'Hay votos que no se compran en público. Te piden mediación opaca entre bloques. El premio es existir en la foto final.',
    win: {
      punch: 'La mediación cuaja. Apareces en la foto como quien «entendió el momento».',
      stim: ['Investidura'],
    },
    lose: {
      punch: 'La mediación se filtra. Quedas como mercader de escaños.',
      stim: ['Mercader'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),
  S('era_mocion', {
    theme: 'filtracion',
    eras: ['bloqueo'],
    bands: ['high', 'top'],
    title: 'Moción y micrófono',
    pitch:
      'Antes de la moción, los pasillos hierven. Un audio tuyo puede adelantar la historia… o enterrarte en ella.',
    win: {
      punch: 'El audio acelera lo inevitable. Te deben un ministerio simbólico.',
      stim: ['Moción'],
    },
    lose: {
      punch: 'El audio te adelanta a ti. La historia sigue sin tu cargo.',
      stim: ['Adelantado'],
    },
  }),
  S('era_pandemia', {
    theme: 'corrupcion',
    eras: ['sanchez'],
    bands: ['mid', 'high'],
    title: 'Mascarillas y margen',
    pitch:
      'Hay urgencia, hay comisión, hay «amigos del sector». Te piden cobertura política para un pedido que huele a fortuna.',
    win: {
      punch: 'La cobertura funciona. La fortuna, también. La hemeroteca esperará.',
      stim: ['Mascarillas'],
    },
    lose: {
      punch: 'La comisión sale. Urgencia ya no es excusa: es titular.',
      stim: ['Comisión'],
    },
    setFlagsWin: ['caja_b'],
    weight: 13,
  }),
  S('era_indultos', {
    theme: 'chantaje',
    eras: ['sanchez'],
    bands: ['high', 'top'],
    parties: ['psoe'],
    title: 'Voto difícil',
    pitch:
      'Te piden un voto que tu federación odia. A cambio: protección de lista y un futuro en Madrid.',
    win: {
      punch: 'Votas. Madrid te abriga. La federación te odia con horario.',
      stim: ['Voto'],
    },
    lose: {
      punch: 'Votas… y la protección no llega. Odio local sin premio nacional.',
      stim: ['Federación'],
    },
  }),
  S('era_amnistia', {
    theme: 'traicion',
    eras: ['tarde'],
    bands: ['mid', 'high', 'top'],
    parties: ['psoe', 'sumar'],
    title: 'Línea roja a precio',
    pitch:
      'Hay una línea roja que el pacto quiere borrar. Te ofrecen protagonismo si defiendes lo indefendible… con estilo.',
    win: {
      punch: 'Defiendes con estilo. El pacto te coloca. La base discute tu alma en hilos.',
      stim: ['Pacto'],
    },
    lose: {
      punch: 'El estilo no basta. Quedas como traductor de lo imperdonable.',
      stim: ['Traductor'],
    },
  }),
  S('era_feijoo', {
    theme: 'filtracion',
    eras: ['tarde'],
    parties: ['pp'],
    bands: ['mid', 'high'],
    title: 'Dossier de oposición',
    pitch:
      'Hay un dossier sobre el Gobierno que «necesita salida». Te eligen como canal. El canal a veces se ahoga.',
    win: {
      punch: 'El dossier pega. Génova sonríe sin sonreír. Tú subes un peldaño mediático.',
      stim: ['Dossier'],
    },
    lose: {
      punch: 'El dossier es flojo. El rebote te deja como aprendiz de fontanero mediático.',
      stim: ['Flojo'],
    },
  }),
  S('era_coalicion', {
    theme: 'enchufe',
    eras: ['sanchez', 'tarde'],
    bands: ['low', 'mid'],
    parties: ['psoe', 'podemos', 'sumar'],
    title: 'Sillón de coalición',
    pitch:
      'Hay un sillón de segundo nivel en un ministerio de coalición. Te lo ofrecen si «no molestas» en redes una semana.',
    win: {
      punch: 'Callas una semana. El sillón es real. Las redes, amnésicas.',
      stim: ['Sillón'],
    },
    lose: {
      punch: 'Callas… y el sillón se lo queda otro. Lecciones de coalición.',
      stim: ['Otro'],
    },
  }),
  S('era_europa_fondos', {
    theme: 'corrupcion',
    eras: ['sanchez', 'tarde'],
    bands: ['mid', 'high'],
    title: 'Fondos y intermediario',
    pitch:
      'NextGeneration tiene intermediarios. Uno te propone «acelerar» un expediente a cambio de un porcentaje moralmente flexible.',
    win: {
      punch: 'El expediente vuela. El porcentaje también. Bruselas está lejos.',
      stim: ['Fondos'],
    },
    lose: {
      punch: 'El OLAF no está tan lejos. El porcentaje se vuelve prueba.',
      stim: ['OLAF'],
    },
    setFlagsWin: ['caja_b'],
  }),
];
