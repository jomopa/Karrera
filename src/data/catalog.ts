import type { OfficeBand, OfficeDef, OfficeId, PartyId, Transition } from '../types';

export const START_YEAR = 2008;
export const END_YEAR = 2030;
export const TOTAL_TURNS = 12;

export interface PartyDef {
  id: PartyId;
  name: string;
  short: string;
  color: string;
  blurb: string;
  /** Año en que puedes fichar / aparecer como opción */
  availableFrom: number;
  /** Eligibles en create (2008) */
  startSelectable: boolean;
  logo: string;
}

export const PARTIES: PartyDef[] = [
  {
    id: 'psoe',
    name: 'Partido Socialista Obrero Español',
    short: 'PSOE',
    color: '#E30613',
    blurb: 'Zapatero, aparato federal, coaliciones',
    availableFrom: 2008,
    startSelectable: true,
    logo: '/logos/psoe.svg',
  },
  {
    id: 'pp',
    name: 'Partido Popular',
    short: 'PP',
    color: '#1D4ED8',
    blurb: 'Rajoy, barones y paciencia electoral',
    availableFrom: 2008,
    startSelectable: true,
    logo: '/logos/pp.svg',
  },
  {
    id: 'iu',
    name: 'Izquierda Unida',
    short: 'IU',
    color: '#AC1F2D',
    blurb: 'Llamazares, coaliciones y calle',
    availableFrom: 2008,
    startSelectable: true,
    logo: '/logos/iu.svg',
  },
  {
    id: 'upyd',
    name: 'Unión Progreso y Democracia',
    short: 'UPyD',
    color: '#E6007E',
    blurb: 'Rosa Díez, regeneración y centralidad',
    availableFrom: 2008,
    startSelectable: true,
    logo: '/logos/upyd.svg',
  },
  {
    id: 'podemos',
    name: 'Podemos',
    short: 'Podemos',
    color: '#6A2C8D',
    blurb: 'Iglesias, 2014: asaltar los cielos',
    availableFrom: 2014,
    startSelectable: false,
    logo: '/logos/podemos.svg',
  },
  {
    id: 'ciudadanos',
    name: 'Ciudadanos',
    short: 'Cs',
    color: '#F26722',
    blurb: 'Rivera: el centro que prometió y se evaporó',
    availableFrom: 2015,
    startSelectable: false,
    logo: '/logos/ciudadanos.svg',
  },
  {
    id: 'vox',
    name: 'Vox',
    short: 'Vox',
    color: '#63BE00',
    blurb: 'Abascal: la derecha que rompe el tablero',
    availableFrom: 2018,
    startSelectable: false,
    logo: '/logos/vox.svg',
  },
  {
    id: 'sumar',
    name: 'Sumar',
    short: 'Sumar',
    color: '#E4032E',
    blurb: 'Yolanda Díaz, confluencia 2023',
    availableFrom: 2023,
    startSelectable: false,
    logo: '/logos/sumar.png',
  },
];

/** TODOS los puestos */
export const OFFICES: OfficeDef[] = [
  // 0 civil
  { id: 'estudiante', title: 'Estudiante', tier: 0, branch: 'civil' },
  { id: 'activista', title: 'Activista', tier: 0, branch: 'civil' },
  { id: 'funcionario', title: 'Funcionario', tier: 0, branch: 'civil' },
  { id: 'abogado', title: 'Abogado', tier: 0, branch: 'civil' },
  { id: 'profesor', title: 'Profesor', tier: 0, branch: 'civil' },
  { id: 'empresario', title: 'Empresario', tier: 0, branch: 'civil' },
  { id: 'periodista', title: 'Periodista', tier: 0, branch: 'civil' },
  { id: 'influencer_civil', title: 'Influencer político', tier: 0, branch: 'civil' },
  { id: 'sindicalista', title: 'Sindicalista', tier: 0, branch: 'civil' },
  { id: 'asesor_privado', title: 'Asesor privado', tier: 0, branch: 'civil' },
  { id: 'becario', title: 'Becario parlamentario', tier: 0, branch: 'civil' },
  { id: 'tertuliano_local', title: 'Tertuliano local', tier: 0, branch: 'civil' },

  // 1 entrada
  { id: 'militante', title: 'Militante', tier: 1, branch: 'entrada' },
  { id: 'juventudes', title: 'Miembro de Juventudes', tier: 1, branch: 'entrada' },
  { id: 'responsable_local', title: 'Responsable local', tier: 1, branch: 'entrada' },
  { id: 'asesor_municipal', title: 'Asesor municipal', tier: 1, branch: 'entrada' },
  { id: 'jefe_gabinete_local', title: 'Jefe de gabinete local', tier: 2, branch: 'entrada' },
  { id: 'tecnico_partido', title: 'Técnico de partido', tier: 1, branch: 'entrada' },
  { id: 'portavoz_juvenil', title: 'Portavoz juvenil', tier: 1, branch: 'entrada' },
  { id: 'concejal_op', title: 'Concejal de oposición', tier: 2, branch: 'entrada' },
  { id: 'concejal_gob', title: 'Concejal de gobierno', tier: 2, branch: 'entrada' },

  // 2 local
  { id: 'concejal_urbanismo', title: 'Concejal de Urbanismo', tier: 2, branch: 'local' },
  { id: 'concejal_hacienda', title: 'Concejal de Hacienda', tier: 2, branch: 'local' },
  { id: 'concejal_cultura', title: 'Concejal de Cultura', tier: 2, branch: 'local' },
  { id: 'teniente_alcalde', title: 'Teniente de Alcalde', tier: 3, branch: 'local' },
  { id: 'portavoz_municipal', title: 'Portavoz municipal', tier: 3, branch: 'local' },
  { id: 'alcalde_pueblo', title: 'Alcalde de pueblo', tier: 3, branch: 'local' },
  { id: 'alcalde_medio', title: 'Alcalde de ciudad mediana', tier: 4, branch: 'local' },
  { id: 'alcalde_grande', title: 'Alcalde de gran ciudad', tier: 5, branch: 'local' },
  { id: 'diputacion', title: 'Presidente de Diputación', tier: 4, branch: 'local' },

  // 3 autonómica
  { id: 'diputado_aut', title: 'Diputado autonómico', tier: 4, branch: 'autonomica' },
  { id: 'portavoz_aut', title: 'Portavoz autonómico', tier: 5, branch: 'autonomica' },
  { id: 'consejero', title: 'Consejero', tier: 5, branch: 'autonomica' },
  { id: 'vp_aut', title: 'Vicepresidente autonómico', tier: 6, branch: 'autonomica' },
  { id: 'pres_aut', title: 'Presidente autonómico', tier: 7, branch: 'autonomica' },

  // 4 nacional
  { id: 'diputado', title: 'Diputado nacional', tier: 5, branch: 'nacional' },
  { id: 'senador', title: 'Senador', tier: 5, branch: 'nacional' },
  { id: 'portavoz_adjunto', title: 'Portavoz adjunto', tier: 6, branch: 'nacional' },
  { id: 'sec_organizacion', title: 'Secretario de Organización', tier: 6, branch: 'organica' },
  { id: 'sec_general', title: 'Secretario General', tier: 7, branch: 'nacional' },
  { id: 'portavoz_parl', title: 'Portavoz parlamentario', tier: 6, branch: 'nacional' },
  { id: 'secretario_estado', title: 'Secretario de Estado', tier: 6, branch: 'nacional' },
  { id: 'ministro', title: 'Ministro', tier: 7, branch: 'nacional' },
  { id: 'vicepresidente', title: 'Vicepresidente del Gobierno', tier: 8, branch: 'nacional' },
  { id: 'presidente', title: 'Presidente del Gobierno', tier: 9, branch: 'nacional' },

  // europea
  { id: 'eurodiputado', title: 'Eurodiputado', tier: 5, branch: 'europea' },
  { id: 'vp_pe', title: 'Vicepresidente del Parlamento Europeo', tier: 6, branch: 'europea' },
  { id: 'comisario', title: 'Comisario Europeo', tier: 8, branch: 'europea' },
  { id: 'alto_ue', title: 'Alto cargo europeo', tier: 8, branch: 'europea' },

  // orgánica
  { id: 'fontanero', title: 'Fontanero del partido', tier: 4, branch: 'organica' },
  { id: 'responsable_territorial', title: 'Responsable territorial', tier: 4, branch: 'organica' },
  { id: 'jefe_estrategia', title: 'Jefe de estrategia', tier: 5, branch: 'organica' },
  { id: 'dir_campana', title: 'Director de campaña', tier: 5, branch: 'organica' },
  { id: 'numero_dos', title: 'Número dos permanente', tier: 6, branch: 'organica' },
  { id: 'baron', title: 'Barón regional', tier: 6, branch: 'organica' },
  { id: 'guru', title: 'Gurú ideológico', tier: 5, branch: 'organica' },

  // media
  { id: 'analista', title: 'Analista político', tier: 3, branch: 'media' },
  { id: 'tertuliano_nac', title: 'Tertuliano nacional', tier: 4, branch: 'media' },
  { id: 'thinktank', title: 'Director de think tank', tier: 4, branch: 'media' },
  { id: 'influencer_top', title: 'Influencer político', tier: 4, branch: 'media' },
  { id: 'presentador', title: 'Presentador político', tier: 5, branch: 'media' },
  { id: 'memorias', title: 'Escritor de memorias', tier: 3, branch: 'media' },

  // retirada
  { id: 'expresidente', title: 'Expresidente', tier: 8, branch: 'retiro' },
  { id: 'conferenciante', title: 'Conferenciante', tier: 3, branch: 'retiro' },
  { id: 'consejero_empresa', title: 'Consejero de empresa', tier: 3, branch: 'retiro' },
  { id: 'profesor_uni', title: 'Profesor universitario', tier: 2, branch: 'retiro' },
  { id: 'fundacion', title: 'Fundación propia', tier: 4, branch: 'retiro' },
  { id: 'olvidado', title: 'Político olvidado', tier: 1, branch: 'retiro' },
];

export function getOffice(id: OfficeId): OfficeDef {
  return OFFICES.find((o) => o.id === id) ?? OFFICES[0]!;
}

/** Transiciones ponderadas: la Moncloa casi no existe */
export const GRAPH: Record<string, Transition[]> = {
  // civil → entrada (siempre subes)
  estudiante: [
    { to: 'juventudes', weight: 35 },
    { to: 'militante', weight: 30 },
    { to: 'activista', weight: 20 },
    { to: 'becario', weight: 15 },
  ],
  activista: [
    { to: 'militante', weight: 30 },
    { to: 'portavoz_juvenil', weight: 25 },
    { to: 'concejal_op', weight: 20 },
    { to: 'influencer_civil', weight: 15 },
    { to: 'fontanero', weight: 10 },
  ],
  funcionario: [
    { to: 'tecnico_partido', weight: 35 },
    { to: 'asesor_municipal', weight: 30 },
    { to: 'militante', weight: 20 },
    { to: 'becario', weight: 15 },
  ],
  abogado: [
    { to: 'asesor_privado', weight: 25 },
    { to: 'asesor_municipal', weight: 30 },
    { to: 'concejal_op', weight: 25 },
    { to: 'tecnico_partido', weight: 20 },
  ],
  profesor: [
    { to: 'militante', weight: 30 },
    { to: 'concejal_cultura', weight: 25 },
    { to: 'analista', weight: 25 },
    { to: 'guru', weight: 20 },
  ],
  empresario: [
    { to: 'asesor_privado', weight: 30 },
    { to: 'concejal_hacienda', weight: 25 },
    { to: 'militante', weight: 25 },
    { to: 'dir_campana', weight: 20 },
  ],
  periodista: [
    { to: 'tertuliano_local', weight: 30 },
    { to: 'analista', weight: 30 },
    { to: 'asesor_municipal', weight: 20 },
    { to: 'portavoz_juvenil', weight: 20 },
  ],
  influencer_civil: [
    { to: 'portavoz_juvenil', weight: 30 },
    { to: 'militante', weight: 25 },
    { to: 'concejal_op', weight: 20 },
    { to: 'influencer_top', weight: 25 },
  ],
  sindicalista: [
    { to: 'militante', weight: 35 },
    { to: 'concejal_gob', weight: 30 },
    { to: 'responsable_local', weight: 20 },
    { to: 'diputado_aut', weight: 15 },
  ],
  asesor_privado: [
    { to: 'asesor_municipal', weight: 35 },
    { to: 'tecnico_partido', weight: 30 },
    { to: 'secretario_estado', weight: 10 },
    { to: 'fontanero', weight: 25 },
  ],
  becario: [
    { to: 'asesor_municipal', weight: 35 },
    { to: 'tecnico_partido', weight: 30 },
    { to: 'juventudes', weight: 20 },
    { to: 'fontanero', weight: 15 },
  ],
  tertuliano_local: [
    { to: 'analista', weight: 35 },
    { to: 'tertuliano_nac', weight: 25 },
    { to: 'concejal_op', weight: 20 },
    { to: 'portavoz_juvenil', weight: 20 },
  ],

  militante: [
    { to: 'responsable_local', weight: 25 },
    { to: 'asesor_municipal', weight: 25 },
    { to: 'concejal_op', weight: 25 },
    { to: 'juventudes', weight: 15 },
    { to: 'tecnico_partido', weight: 10 },
  ],
  juventudes: [
    { to: 'portavoz_juvenil', weight: 30 },
    { to: 'asesor_municipal', weight: 25 },
    { to: 'concejal_op', weight: 25 },
    { to: 'fontanero', weight: 20 },
  ],
  responsable_local: [
    { to: 'concejal_gob', weight: 30 },
    { to: 'concejal_op', weight: 25 },
    { to: 'jefe_gabinete_local', weight: 25 },
    { to: 'responsable_territorial', weight: 20 },
  ],
  asesor_municipal: [
    { to: 'jefe_gabinete_local', weight: 30 },
    { to: 'concejal_gob', weight: 30 },
    { to: 'fontanero', weight: 25 },
    { to: 'tecnico_partido', weight: 15 },
  ],
  jefe_gabinete_local: [
    { to: 'teniente_alcalde', weight: 25 },
    { to: 'fontanero', weight: 30 },
    { to: 'dir_campana', weight: 25 },
    { to: 'concejal_gob', weight: 20 },
  ],
  tecnico_partido: [
    { to: 'fontanero', weight: 35 },
    { to: 'jefe_estrategia', weight: 25 },
    { to: 'dir_campana', weight: 25 },
    { to: 'asesor_municipal', weight: 15 },
  ],
  portavoz_juvenil: [
    { to: 'concejal_op', weight: 30 },
    { to: 'diputado_aut', weight: 25 },
    { to: 'influencer_top', weight: 20 },
    { to: 'portavoz_municipal', weight: 25 },
  ],
  concejal_op: [
    { to: 'concejal_gob', weight: 30 },
    { to: 'concejal_urbanismo', weight: 20 },
    { to: 'concejal_cultura', weight: 15 },
    { to: 'portavoz_municipal', weight: 20 },
    { to: 'alcalde_pueblo', weight: 15 },
  ],
  concejal_gob: [
    { to: 'concejal_urbanismo', weight: 20 },
    { to: 'concejal_hacienda', weight: 20 },
    { to: 'teniente_alcalde', weight: 25 },
    { to: 'portavoz_municipal', weight: 20 },
    { to: 'alcalde_pueblo', weight: 15 },
  ],

  concejal_urbanismo: [
    { to: 'teniente_alcalde', weight: 35 },
    { to: 'portavoz_municipal', weight: 25 },
    { to: 'alcalde_pueblo', weight: 25 },
    { to: 'diputado_aut', weight: 15 },
  ],
  concejal_hacienda: [
    { to: 'teniente_alcalde', weight: 35 },
    { to: 'alcalde_medio', weight: 25 },
    { to: 'diputado_aut', weight: 25 },
    { to: 'secretario_estado', weight: 15 },
  ],
  concejal_cultura: [
    { to: 'portavoz_municipal', weight: 30 },
    { to: 'alcalde_pueblo', weight: 25 },
    { to: 'diputado_aut', weight: 25 },
    { to: 'analista', weight: 20 },
  ],
  teniente_alcalde: [
    { to: 'alcalde_medio', weight: 35 },
    { to: 'alcalde_pueblo', weight: 20 },
    { to: 'diputado_aut', weight: 25 },
    { to: 'portavoz_municipal', weight: 20 },
  ],
  portavoz_municipal: [
    { to: 'alcalde_medio', weight: 30 },
    { to: 'diputado_aut', weight: 30 },
    { to: 'diputado', weight: 20 },
    { to: 'tertuliano_nac', weight: 20 },
  ],
  alcalde_pueblo: [
    { to: 'alcalde_medio', weight: 40 },
    { to: 'diputacion', weight: 25 },
    { to: 'diputado_aut', weight: 25 },
    { to: 'baron', weight: 10 },
  ],
  alcalde_medio: [
    { to: 'alcalde_grande', weight: 25 },
    { to: 'diputacion', weight: 20 },
    { to: 'pres_aut', weight: 12 },
    { to: 'diputado', weight: 25 },
    { to: 'baron', weight: 18 },
  ],
  alcalde_grande: [
    { to: 'pres_aut', weight: 28 },
    { to: 'ministro', weight: 15 },
    { to: 'sec_general', weight: 10 },
    { to: 'diputado', weight: 22 },
    { to: 'baron', weight: 20 },
    { to: 'olvidado', weight: 5 },
  ],
  diputacion: [
    { to: 'pres_aut', weight: 25 },
    { to: 'baron', weight: 30 },
    { to: 'senador', weight: 25 },
    { to: 'diputado', weight: 20 },
  ],

  diputado_aut: [
    { to: 'portavoz_aut', weight: 25 },
    { to: 'consejero', weight: 25 },
    { to: 'diputado', weight: 30 },
    { to: 'eurodiputado', weight: 10 },
    { to: 'tertuliano_nac', weight: 10 },
  ],
  portavoz_aut: [
    { to: 'consejero', weight: 30 },
    { to: 'vp_aut', weight: 25 },
    { to: 'diputado', weight: 25 },
    { to: 'sec_organizacion', weight: 20 },
  ],
  consejero: [
    { to: 'vp_aut', weight: 30 },
    { to: 'pres_aut', weight: 20 },
    { to: 'ministro', weight: 15 },
    { to: 'diputado', weight: 20 },
    { to: 'eurodiputado', weight: 15 },
  ],
  vp_aut: [
    { to: 'pres_aut', weight: 35 },
    { to: 'ministro', weight: 25 },
    { to: 'vicepresidente', weight: 5, rare: true },
    { to: 'eurodiputado', weight: 20 },
    { to: 'baron', weight: 15 },
  ],
  pres_aut: [
    { to: 'baron', weight: 30 },
    { to: 'ministro', weight: 20 },
    { to: 'sec_general', weight: 15 },
    { to: 'vicepresidente', weight: 8, rare: true },
    { to: 'presidente', weight: 2, rare: true },
    { to: 'eurodiputado', weight: 15 },
    { to: 'fundacion', weight: 10 },
  ],

  diputado: [
    { to: 'portavoz_adjunto', weight: 20 },
    { to: 'senador', weight: 10 },
    { to: 'ministro', weight: 12 },
    { to: 'eurodiputado', weight: 12 },
    { to: 'portavoz_parl', weight: 15 },
    { to: 'sec_organizacion', weight: 12 },
    { to: 'tertuliano_nac', weight: 10 },
    { to: 'olvidado', weight: 9 },
  ],
  senador: [
    { to: 'diputado', weight: 25 },
    { to: 'eurodiputado', weight: 25 },
    { to: 'ministro', weight: 15 },
    { to: 'baron', weight: 20 },
    { to: 'conferenciante', weight: 15 },
  ],
  portavoz_adjunto: [
    { to: 'portavoz_parl', weight: 35 },
    { to: 'ministro', weight: 25 },
    { to: 'sec_organizacion', weight: 20 },
    { to: 'numero_dos', weight: 20 },
  ],
  sec_organizacion: [
    { to: 'numero_dos', weight: 35 },
    { to: 'sec_general', weight: 20 },
    { to: 'dir_campana', weight: 20 },
    { to: 'fontanero', weight: 15 },
    { to: 'ministro', weight: 10 },
  ],
  sec_general: [
    { to: 'presidente', weight: 8, rare: true },
    { to: 'vicepresidente', weight: 15 },
    { to: 'portavoz_parl', weight: 20 },
    { to: 'numero_dos', weight: 25 },
    { to: 'eurodiputado', weight: 15 },
    { to: 'tertuliano_nac', weight: 17 },
  ],
  portavoz_parl: [
    { to: 'ministro', weight: 30 },
    { to: 'sec_general', weight: 15 },
    { to: 'vicepresidente', weight: 10 },
    { to: 'tertuliano_nac', weight: 25 },
    { to: 'eurodiputado', weight: 20 },
  ],
  secretario_estado: [
    { to: 'ministro', weight: 40 },
    { to: 'eurodiputado', weight: 25 },
    { to: 'comisario', weight: 10 },
    { to: 'diputado', weight: 25 },
  ],
  ministro: [
    { to: 'vicepresidente', weight: 18 },
    { to: 'presidente', weight: 3, rare: true },
    { to: 'eurodiputado', weight: 20 },
    { to: 'comisario', weight: 12 },
    { to: 'tertuliano_nac', weight: 15 },
    { to: 'fundacion', weight: 12 },
    { to: 'olvidado', weight: 10 },
    { to: 'expresidente', weight: 10 },
  ],
  vicepresidente: [
    { to: 'presidente', weight: 12, rare: true },
    { to: 'comisario', weight: 20 },
    { to: 'eurodiputado', weight: 20 },
    { to: 'fundacion', weight: 18 },
    { to: 'tertuliano_nac', weight: 15 },
    { to: 'expresidente', weight: 15 },
  ],
  presidente: [
    { to: 'expresidente', weight: 55 },
    { to: 'fundacion', weight: 20 },
    { to: 'conferenciante', weight: 15 },
    { to: 'alto_ue', weight: 10 },
  ],

  eurodiputado: [
    { to: 'vp_pe', weight: 25 },
    { to: 'comisario', weight: 20 },
    { to: 'alto_ue', weight: 15 },
    { to: 'ministro', weight: 15 },
    { to: 'tertuliano_nac', weight: 15 },
    { to: 'fundacion', weight: 10 },
  ],
  vp_pe: [
    { to: 'comisario', weight: 40 },
    { to: 'alto_ue', weight: 30 },
    { to: 'fundacion', weight: 30 },
  ],
  comisario: [
    { to: 'alto_ue', weight: 45 },
    { to: 'fundacion', weight: 30 },
    { to: 'conferenciante', weight: 25 },
  ],
  alto_ue: [
    { to: 'fundacion', weight: 40 },
    { to: 'conferenciante', weight: 35 },
    { to: 'memorias', weight: 25 },
  ],

  fontanero: [
    { to: 'responsable_territorial', weight: 25 },
    { to: 'jefe_estrategia', weight: 25 },
    { to: 'dir_campana', weight: 25 },
    { to: 'sec_organizacion', weight: 15 },
    { to: 'numero_dos', weight: 10 },
  ],
  responsable_territorial: [
    { to: 'baron', weight: 35 },
    { to: 'sec_organizacion', weight: 25 },
    { to: 'dir_campana', weight: 20 },
    { to: 'diputado', weight: 20 },
  ],
  jefe_estrategia: [
    { to: 'dir_campana', weight: 35 },
    { to: 'numero_dos', weight: 25 },
    { to: 'sec_organizacion', weight: 25 },
    { to: 'guru', weight: 15 },
  ],
  dir_campana: [
    { to: 'sec_organizacion', weight: 30 },
    { to: 'numero_dos', weight: 25 },
    { to: 'ministro', weight: 15 },
    { to: 'fontanero', weight: 15 },
    { to: 'thinktank', weight: 15 },
  ],
  numero_dos: [
    { to: 'sec_general', weight: 30 },
    { to: 'ministro', weight: 20 },
    { to: 'presidente', weight: 4, rare: true },
    { to: 'fontanero', weight: 20 },
    { to: 'tertuliano_nac', weight: 26 },
  ],
  baron: [
    { to: 'pres_aut', weight: 25 },
    { to: 'sec_general', weight: 20 },
    { to: 'ministro', weight: 20 },
    { to: 'numero_dos', weight: 20 },
    { to: 'presidente', weight: 3, rare: true },
    { to: 'fundacion', weight: 12 },
  ],
  guru: [
    { to: 'thinktank', weight: 30 },
    { to: 'tertuliano_nac', weight: 25 },
    { to: 'sec_general', weight: 15 },
    { to: 'numero_dos', weight: 15 },
    { to: 'memorias', weight: 15 },
  ],

  analista: [
    { to: 'tertuliano_nac', weight: 40 },
    { to: 'thinktank', weight: 25 },
    { to: 'influencer_top', weight: 20 },
    { to: 'presentador', weight: 15 },
  ],
  tertuliano_nac: [
    { to: 'presentador', weight: 30 },
    { to: 'influencer_top', weight: 25 },
    { to: 'thinktank', weight: 20 },
    { to: 'memorias', weight: 15 },
    { to: 'diputado', weight: 10 },
  ],
  thinktank: [
    { to: 'guru', weight: 25 },
    { to: 'ministro', weight: 20 },
    { to: 'comisario', weight: 15 },
    { to: 'memorias', weight: 20 },
    { to: 'conferenciante', weight: 20 },
  ],
  influencer_top: [
    { to: 'presentador', weight: 30 },
    { to: 'tertuliano_nac', weight: 30 },
    { to: 'diputado', weight: 20 },
    { to: 'memorias', weight: 20 },
  ],
  presentador: [
    { to: 'memorias', weight: 40 },
    { to: 'thinktank', weight: 30 },
    { to: 'conferenciante', weight: 30 },
  ],
  memorias: [
    { to: 'conferenciante', weight: 40 },
    { to: 'fundacion', weight: 30 },
    { to: 'olvidado', weight: 30 },
  ],

  expresidente: [
    { to: 'fundacion', weight: 40 },
    { to: 'conferenciante', weight: 30 },
    { to: 'consejero_empresa', weight: 20 },
    { to: 'alto_ue', weight: 10 },
  ],
  conferenciante: [
    { to: 'consejero_empresa', weight: 40 },
    { to: 'fundacion', weight: 30 },
    { to: 'olvidado', weight: 30 },
  ],
  consejero_empresa: [
    { to: 'fundacion', weight: 40 },
    { to: 'olvidado', weight: 35 },
    { to: 'profesor_uni', weight: 25 },
  ],
  profesor_uni: [
    { to: 'memorias', weight: 40 },
    { to: 'olvidado', weight: 60 },
  ],
  fundacion: [
    { to: 'conferenciante', weight: 50 },
    { to: 'olvidado', weight: 50 },
  ],
  olvidado: [{ to: 'olvidado', weight: 100 }],
};

export const CIVIL_STARTS = [
  'estudiante',
  'activista',
  'funcionario',
  'abogado',
  'profesor',
  'empresario',
  'periodista',
  'influencer_civil',
  'sindicalista',
  'asesor_privado',
  'becario',
  'tertuliano_local',
] as const;

/** Años-clave: ritmo rápido pero hemeroteca densa */
export const TURN_YEARS = [2008, 2010, 2011, 2012, 2014, 2015, 2017, 2018, 2020, 2023, 2026, 2030];

export function getParty(id: PartyId) {
  return PARTIES.find((p) => p.id === id)!;
}

export function startParties() {
  return PARTIES.filter((p) => p.startSelectable);
}

export function partiesUnlockableIn(year: number, current: PartyId) {
  return PARTIES.filter((p) => !p.startSelectable && p.availableFrom === year && p.id !== current);
}

export function officeBand(tier: number): OfficeBand {
  if (tier <= 0) return 'civil';
  if (tier <= 2) return 'low';
  if (tier <= 5) return 'mid';
  if (tier <= 7) return 'high';
  return 'top';
}
