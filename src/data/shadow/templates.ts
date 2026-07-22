import type { ShadowOffer } from '../../types';
import { S } from './_helpers';

/** Núcleos por tema × banda: el enchufe de agrupación no es el sobre de consejería. */
export const SHADOW_TEMPLATES: ShadowOffer[] = [
  // ——— ENCHUFE ———
  S('tpl_enchufe_civil', {
    theme: 'enchufe',
    bands: ['civil', 'low'],
    title: 'Un primo en Recursos',
    pitch:
      'Alguien del partido te ofrece un contrato basura con proyección. «Firma, calla y escala.» El currículum oficial nunca lo explicará.',
    win: {
      punch: 'Entras por la puerta de servicio. En seis meses ya mandas café… y listas.',
      stim: ['Enchufe', 'Lista'],
    },
    lose: {
      punch: 'El contrato salta en un periódico local. Tu nombre y el del primo, juntos.',
      stim: ['Nepotismo', 'Portada local'],
    },
    setFlagsWin: ['enchufe_temprano'],
  }),
  S('tpl_enchufe_mid', {
    theme: 'enchufe',
    bands: ['mid'],
    title: 'Plaza a dedo',
    pitch:
      'Hay una jefatura intermedia que «necesita perfil político». Te la sirven caliente. Solo hay que no preguntar por el concurso.',
    win: {
      punch: 'La plaza es tuya. El concurso, un trámite teatral. El despacho huele a poder nuevo.',
      stim: ['Dedazo', 'Despacho'],
    },
    lose: {
      punch: 'Un opositor filtra el chat. «Concurso» se convierte en meme regional.',
      stim: ['Chat', 'Meme'],
    },
  }),
  S('tpl_enchufe_high', {
    theme: 'enchufe',
    bands: ['high', 'top'],
    title: 'El favor del barón',
    pitch:
      'Un barón territorial te ofrece un salto de escalafón a cambio de lealtad absoluta. No hay papel. Solo un apretón de manos que pesa como un BOE.',
    win: {
      punch: 'El barón cumple. Subes dos peldaños y aprendes a sonreír sin enseñar los dientes.',
      stim: ['Barón', 'Lealtad'],
    },
    lose: {
      punch: 'El barón cae primero. Te arrastra el eco: «era de los suyos».',
      stim: ['Caída en cadena'],
    },
    setFlagsWin: ['deuda_baron'],
  }),

  // ——— CORRUPCIÓN ———
  S('tpl_corr_low', {
    theme: 'corrupcion',
    bands: ['civil', 'low', 'mid'],
    title: 'Factura amiga',
    pitch:
      'Una empresa «amiga» propone inflar un contrato menor. Tu comisión cabe en un sobre. O en un viaje. Como prefieras.',
    win: {
      punch: 'El sobre llega. La factura cuadra. Duermes peor, vives mejor.',
      stim: ['Sobre', 'Comisión'],
    },
    lose: {
      punch: 'Hacienda no es amiga. El correo electrónico tiene tu firma. Empieza el sumario chico.',
      stim: ['Hacienda', 'Firma'],
    },
    setFlagsWin: ['caja_b'],
    setFlagsLose: ['sombra_quema'],
  }),
  S('tpl_corr_high', {
    theme: 'corrupcion',
    bands: ['high', 'top'],
    title: 'Adjudicación exprés',
    pitch:
      'Una gran obra necesita «agilidad política». Te piden cobertura. A cambio: silencio, agenda y un futuro que no cabe en nómina.',
    win: {
      punch: 'La obra sale. Tú sales en la foto de corte de cinta… y en otra contabilidad.',
      stim: ['Obra', 'Cinta'],
    },
    lose: {
      punch: 'La UDEF llama al despacho. El corte de cinta se convierte en prueba.',
      stim: ['UDEF', 'Prueba'],
    },
    setFlagsWin: ['caja_b'],
  }),

  // ——— CAJA B ———
  S('tpl_cajab_mid', {
    theme: 'caja_b',
    bands: ['mid', 'high'],
    title: 'Contabilidad paralela',
    pitch:
      'Te enseñan un Excel que no existe. Hay sobres, hay nombres, hay fechas. Te ofrecen entrar en el circuito «por si acaso».',
    win: {
      punch: 'Entras en el circuito. El Excel te protege… hasta que deja de hacerlo.',
      stim: ['Excel', 'Circuito'],
    },
    lose: {
      punch: 'Alguien fotocopia el Excel. Tu inicial aparece demasiado clara.',
      stim: ['Fotocopia', 'Inicial'],
    },
    setFlagsWin: ['caja_b'],
    forbidFlags: ['destino_naranja_light'],
  }),
  S('tpl_cajab_org', {
    theme: 'caja_b',
    bands: ['low', 'mid', 'high'],
    personalities: ['fontanero'],
    title: 'La caja del aparato',
    pitch:
      'Organización necesita liquidez opaca para «movilizar». Tú serías el eslabón discreto. Los eslabones brillan cuando se rompen.',
    win: {
      punch: 'El aparato te ficha como fontanero de verdad. El agua (negra) pasa por ti.',
      stim: ['Aparato', 'Liquidez'],
    },
    lose: {
      punch: 'Te conviertes en el eslabón débil. Todos lo sabían. Nadie lo firmó.',
      stim: ['Eslabón'],
    },
    setFlagsWin: ['caja_b'],
  }),

  // ——— TRAICIÓN ———
  S('tpl_trai_low', {
    theme: 'traicion',
    bands: ['civil', 'low', 'mid'],
    title: 'Cuchillo de agrupación',
    pitch:
      'Tu jefe local está tocado. Te proponen cambiar de caballo antes del congreso. Lealtad… a quién, exactamente?',
    win: {
      punch: 'Cambias de caballo. El nuevo gana. Tú heredas el despacho pequeño.',
      stim: ['Congreso', 'Cuchillo'],
    },
    lose: {
      punch: 'El jefe sobrevive y te marca. En política local, eso es exilio interior.',
      stim: ['Marca', 'Exilio'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),
  S('tpl_trai_high', {
    theme: 'traicion',
    bands: ['high', 'top'],
    title: 'Primarias en diferido',
    pitch:
      'Hay un movimiento interno contra el líder. Te piden firma, filtración o silencio cómplice. El premio es un ministerio… o una tumba política.',
    win: {
      punch: 'El líder cae. Tú estabas «del lado correcto» exactamente a tiempo.',
      stim: ['Primarias', 'Timing'],
    },
    lose: {
      punch: 'El líder aguanta. Tu firma circula. Pasa a ser material de chantaje eterno.',
      stim: ['Firma', 'Chantaje'],
    },
    setFlagsWin: ['traidor_marcado'],
    setFlagsLose: ['traidor_marcado'],
  }),

  // ——— CHANTAJE ———
  S('tpl_chant_any', {
    theme: 'chantaje',
    bands: ['mid', 'high', 'top'],
    title: 'Carpeta en la mesa',
    pitch:
      'Alguien deja una carpeta. Fotos, mensajes, un favor antiguo. «Colabora y esto no existe.» El precio es un voto, un silencio o un ascenso ajeno.',
    win: {
      punch: 'Colaboras. La carpeta desaparece. El ascenso ajeno… te salpica a ti.',
      stim: ['Carpeta', 'Silencio'],
    },
    lose: {
      punch: 'La carpeta sale igual. Colaboraste gratis y con rastro.',
      stim: ['Doble golpe'],
    },
  }),
  S('tpl_chant_sombra', {
    theme: 'chantaje',
    requireFlags: ['sombra_ok'],
    title: 'Quien calló una vez',
    pitch:
      'El mismo contacto de entonces vuelve. «Ya tienes piel en el juego.» Ahora el precio es más alto: un nombre, un contrato, una cabeza.',
    win: {
      punch: 'Pagas otra vez. El círculo se estrecha, pero tú sigues dentro.',
      stim: ['Deuda', 'Círculo'],
    },
    lose: {
      punch: 'Intentas romper el círculo. El círculo te rompe a ti en portada.',
      stim: ['Portada'],
    },
    setFlagsLose: ['sombra_quema'],
    weight: 14,
  }),

  // ——— FILTRACIÓN ———
  S('tpl_filt_atril', {
    theme: 'filtracion',
    personalities: ['atril'],
    bands: ['low', 'mid', 'high'],
    title: 'Audio «sin atribución»',
    pitch:
      'Un medio amigo quiere un audio of. Te dan guion y cobertura. Si sale bien, existes. Si sale mal, existes demasiado.',
    win: {
      punch: 'El audio mueve el tablero. Te citan sin nombrarte. El poder te debe un favor ruidoso.',
      stim: ['Off', 'Tablero'],
    },
    lose: {
      punch: 'El audio se atribuye. Tu voz, tu ambición, tu funeral mediático.',
      stim: ['Atribución'],
    },
  }),
  S('tpl_filt_font', {
    theme: 'filtracion',
    personalities: ['fontanero'],
    bands: ['mid', 'high', 'top'],
    title: 'Dossier al rival',
    pitch:
      'Tienes (o te dan) un dossier sobre un rival interno. Filtrar es guerra. No filtrar es perder la guerra en silencio.',
    win: {
      punch: 'El dossier hace su trabajo. El rival sangra. Tú parece que no estabas.',
      stim: ['Dossier', 'Guerra'],
    },
    lose: {
      punch: 'Rastrean la filtración. El fontanero siempre deja huella de vapor.',
      stim: ['Rastro'],
    },
  }),
  S('tpl_filt_cruzado', {
    theme: 'filtracion',
    personalities: ['cruzado'],
    title: 'La verdad incómoda',
    pitch:
      'Sabes algo que el partido niega. Un periodista te ofrece anonimato. La coherencia pide sangre; el carnet, silencio.',
    win: {
      punch: 'Filtras. La base te canoniza. El aparato te odia con respeto.',
      stim: ['Herejía útil'],
    },
    lose: {
      punch: 'El anonimato falla. Quedas como traidor para unos y santo inútil para otros.',
      stim: ['Anónimo fallido'],
    },
    setFlagsLose: ['traidor_marcado'],
  }),

  // ——— Genéricos de clima (cualquier banda) ———
  S('tpl_viaje', {
    theme: 'corrupcion',
    bands: ['mid', 'high'],
    title: 'Viaje de «formación»',
    pitch:
      'Una fundación te invita a un congreso en un hotel imposible. El programa dura dos horas. El resto, networking con factura ajena.',
    win: {
      punch: 'Vuelves bronceado de contactos. Nadie pregunta el programa.',
      stim: ['Fundación', 'Hotel'],
    },
    lose: {
      punch: 'Un tuit con la piscina. La oposición no necesita más.',
      stim: ['Tuit', 'Piscina'],
    },
  }),
  S('tpl_lista', {
    theme: 'enchufe',
    bands: ['low', 'mid'],
    title: 'Puesto seguro en lista',
    pitch:
      'Te garantizan un puesto elegible si «ayudas» en la campaña con métodos que no salen en el manual.',
    win: {
      punch: 'El puesto llega. El manual, a la trituradora.',
      stim: ['Lista', 'Elegible'],
    },
    lose: {
      punch: 'La ayuda se filtra. El puesto se esfuma. Quedas en el capítulo de «irregulares».',
      stim: ['Irregular'],
    },
  }),
  S('tpl_silencio', {
    theme: 'chantaje',
    bands: ['civil', 'low', 'mid'],
    title: 'Callar un nombre',
    pitch:
      'Oíste un nombre que no debías. Te piden olvido a cambio de un empujón. El olvido en política es un músculo.',
    win: {
      punch: 'Olvidas. Te empujan. El nombre vuelve… pero ya no es tu problema.',
      stim: ['Olvido'],
    },
    lose: {
      punch: 'Olvidas mal. El nombre sale y te señalan como quien sabía.',
      stim: ['Sabías'],
    },
  }),
  S('tpl_media_compra', {
    theme: 'corrupcion',
    bands: ['mid', 'high'],
    personalities: ['atril', 'fontanero'],
    title: 'Publicidad amiga',
    pitch:
      'Un medio local necesita «apoyo institucional». Tú puedes derivar presupuesto. Ellos, titulares amables.',
    win: {
      punch: 'Los titulares sonríen. El presupuesto también. Simbiosis española.',
      stim: ['Titulares'],
    },
    lose: {
      punch: 'La Sindicatura pregunta. «Apoyo» se traduce como compra de voluntades.',
      stim: ['Sindicatura'],
    },
  }),
  S('tpl_top_pacto', {
    theme: 'traicion',
    bands: ['top'],
    title: 'Pacto de despacho',
    pitch:
      'En la cima, los pactos no se votan: se susurran. Te ofrecen un bloque de poder a cambio de traicionar a tu facción de origen.',
    win: {
      punch: 'El bloque es tuyo. La facción te maldice en privado y te necesita en público.',
      stim: ['Bloque'],
    },
    lose: {
      punch: 'El susurro se hace eco. Quedas entre dos fuegos sin despacho ni relato.',
      stim: ['Dos fuegos'],
    },
    setFlagsWin: ['traidor_marcado'],
    setFlagsLose: ['traidor_marcado'],
  }),
  S('tpl_regalo', {
    theme: 'corrupcion',
    bands: ['low', 'mid'],
    title: 'Regalo de Navidad',
    pitch:
      'Una caja llega sin remite. Dentro, un reloj que no cabe en tu nómina. Aceptarlo es firmar con la sonrisa.',
    win: {
      punch: 'El reloj marca tu hora. Nadie pregunta la marca… todavía.',
      stim: ['Regalo'],
    },
    lose: {
      punch: 'Una foto del reloj en redes. El precio real era la hemeroteca.',
      stim: ['Foto'],
    },
  }),
  S('tpl_alcalde_obra', {
    theme: 'corrupcion',
    bands: ['mid', 'high'],
    title: 'Parking fantasma',
    pitch:
      'Hay un parking que necesita licencia exprés. El promotor habla de «desarrollo». Tú oyes comisión.',
    win: {
      punch: 'La licencia sale. El parking, también. Tu cuenta, en silencio.',
      stim: ['Licencia'],
    },
    lose: {
      punch: 'Urbanismo investiga. El parking se llama ahora «tu sumario».',
      stim: ['Urbanismo'],
    },
    setFlagsWin: ['caja_b'],
  }),
  S('tpl_eurodiputado', {
    theme: 'enchufe',
    bands: ['high', 'top'],
    title: 'Plaza en Bruselas',
    pitch:
      'Hay un hueco en una lista europea. Te lo ofrecen si «olvidas» una pelea interna. Bruselas lava currículums.',
    win: {
      punch: 'Vuelas a Bruselas. La pelea interna se queda en tierra.',
      stim: ['Europa'],
    },
    lose: {
      punch: 'Olvidas la pelea… y la plaza se la queda el sobrino de otro.',
      stim: ['Sobrino'],
    },
  }),
  S('tpl_medios_compra2', {
    theme: 'filtracion',
    bands: ['mid', 'high', 'top'],
    title: 'Titular a la carta',
    pitch:
      'Un director te ofrece portada a cambio de exclusiva… o de publicidad institucional. El periodismo también tiene tarifas.',
    win: {
      punch: 'La portada te construye. La tarifa, te mancha en privado.',
      stim: ['Portada'],
    },
    lose: {
      punch: 'La exclusiva se vuelve contra ti. El director niega el café.',
      stim: ['Contra'],
    },
  }),
];
