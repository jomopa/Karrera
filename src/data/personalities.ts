import type { PersonalityId } from '../types';

export interface PersonalityDef {
  id: PersonalityId;
  name: string;
  blurb: string;
  effect: string;
  mods: { forma: number; fama: number; sombra: number; etica: number };
  /** Branches favorecidas en el grafo */
  favorBranches: string[];
  favorOffices: string[];
}

export const PERSONALITIES: PersonalityDef[] = [
  {
    id: 'fontanero',
    name: 'El Fontanero',
    blurb: 'Pasillos, listas y favores. Mandas sin salir en el telediario.',
    effect: 'Más aparato, menos foco. El poder opaco te quiere.',
    mods: { forma: 6, fama: -8, sombra: 4, etica: -2 },
    favorBranches: ['organica', 'entrada'],
    favorOffices: [
      'fontanero',
      'tecnico_partido',
      'asesor_municipal',
      'jefe_gabinete_local',
      'sec_organizacion',
      'dir_campana',
      'numero_dos',
      'responsable_territorial',
    ],
  },
  {
    id: 'atril',
    name: 'El Atril',
    blurb: 'Frase, clip y micrófono. Si no hay cámara, inventas una.',
    effect: 'Más fama, más riesgo de meme. El relato eres tú.',
    mods: { forma: 2, fama: 12, sombra: 2, etica: -6 },
    favorBranches: ['media', 'nacional'],
    favorOffices: [
      'portavoz_juvenil',
      'portavoz_municipal',
      'portavoz_aut',
      'portavoz_parl',
      'portavoz_adjunto',
      'tertuliano_nac',
      'analista',
      'influencer_top',
      'presentador',
    ],
  },
  {
    id: 'cruzado',
    name: 'El Cruzado',
    blurb: 'Causa, pureza y línea roja. Prefieres tener razón a tener escaño… casi.',
    effect: 'Más ética, menos aparato. Los movimientos te llaman.',
    mods: { forma: -2, fama: 2, sombra: -4, etica: 14 },
    favorBranches: ['civil', 'entrada'],
    favorOffices: [
      'activista',
      'militante',
      'portavoz_juvenil',
      'concejal_op',
      'guru',
      'influencer_civil',
    ],
  },
];

export function getPersonality(id: PersonalityId) {
  return PERSONALITIES.find((p) => p.id === id)!;
}
