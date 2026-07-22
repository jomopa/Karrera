export type Screen = 'home' | 'create' | 'event' | 'result' | 'legacy' | 'shadow' | 'shadowResult';

/** Partidos jugables a lo largo de la década */
export type PartyId = 'psoe' | 'pp' | 'iu' | 'upyd' | 'podemos' | 'ciudadanos' | 'vox' | 'sumar';

export type PersonalityId = 'fontanero' | 'atril' | 'cruzado';

export type Branch =
  | 'civil'
  | 'entrada'
  | 'local'
  | 'autonomica'
  | 'nacional'
  | 'europea'
  | 'organica'
  | 'media'
  | 'retiro';

export type OfficeId = string;
export type OfficeBand = 'civil' | 'low' | 'mid' | 'high' | 'top';

export type Quality = 'excelente' | 'bien' | 'tirando' | 'mal' | 'escandalo';

export type ChoiceKind = 'safe' | 'risk';

/** Banda de outcome causal (antes de mapear a calidad/cargo) */
export type OutcomeBand = 'boom' | 'win' | 'hold' | 'hurt' | 'crash';

export type OfficeIntent = 'up' | 'side' | 'down' | 'scandalExit';

export interface OfficeDef {
  id: OfficeId;
  title: string;
  tier: number;
  branch: Branch;
}

export interface Transition {
  to: OfficeId;
  weight: number;
  minQ?: number;
  rare?: boolean;
}

export interface PollRow {
  party: PartyId;
  pct: number;
}

export interface ChoiceDef {
  kind: ChoiceKind;
  label: string;
  hint: string;
  ok: string;
  fail: string;
  advanceBias: number;
  switchTo?: PartyId;
  /** Flags al resolver con éxito (boom/win/hold-success) */
  setFlagsOk?: string[];
  /** Flags al resolver con fracaso (hurt/crash) */
  setFlagsFail?: string[];
}

export interface EventVariant {
  id: string;
  parties?: PartyId[];
  bands?: OfficeBand[];
  personalities?: PersonalityId[];
  requireFlags?: string[];
  forbidFlags?: string[];
  hook?: string;
  safe: ChoiceDef;
  risk: ChoiceDef;
}

export interface YearEvent {
  id: string;
  year: number;
  title: string;
  lore: string;
  /** Peso base en el pool del año */
  weight?: number;
  requireFlags?: string[];
  forbidFlags?: string[];
  variants: EventVariant[];
}

export interface Player {
  name: string;
  party: PartyId;
  personality: PersonalityId;
  seed: number;
  year: number;
  age: number;
  office: OfficeId;
  forma: number;
  fama: number;
  sombra: number;
  etica: number;
  escandalos: number;
  traiciones: number;
  derrotas: number;
  victorias: number;
  aniosGobierno: number;
  officesHeld: { year: number; office: OfficeId; quality: Quality }[];
  flags: string[];
  seenEventIds: string[];
  seenShadowIds: string[];
  seenReactions: string[];
  /** Ofertas de sombra presentadas (aceptadas o saltadas) */
  shadowCount: number;
  /** Si true, la próxima oportunidad de oferta se salta (anti-rachas) */
  shadowCooldown: boolean;
  turn: number;
  totalTurns: number;
  retired: boolean;
  rating: number;
}

export interface TurnBeat {
  yearFrom: number;
  yearTo: number;
  fromOffice: OfficeId;
  toOffice: OfficeId;
  quality: Quality;
  band?: OutcomeBand;
  /** Línea única de golpe */
  punch?: string;
  reaction: string;
  support: string;
  valence: 'up' | 'flat' | 'down';
  headline: string;
  detail: string;
  stim: string[];
  choiceKind: ChoiceKind;
  choiceLabel: string;
  polls: PollRow[];
  partyAfter: PartyId;
  ratingBefore: number;
  ratingAfter: number;
}

export interface Legacy {
  arc: string;
  title: string;
  blurb: string;
  ultraRare?: string;
  lines: string[];
  score: number;
  peakTitle: string;
  patrimony: {
    salaries: number;
    underTable: number;
    total: number;
    ethicsNote: string;
    joke: string;
  };
}

export interface PendingEvent {
  event: YearEvent;
  variant: EventVariant;
  polls: PollRow[];
  yearFrom: number;
  yearTo: number;
}

export type ShadowTheme = 'corrupcion' | 'traicion' | 'chantaje' | 'caja_b' | 'filtracion' | 'enchufe';

export type ShadowEra = 'zap' | 'rajoy' | 'bloqueo' | 'sanchez' | 'tarde';

export interface ShadowOutcomeCopy {
  punch: string;
  stim?: string[];
}

export interface ShadowOffer {
  id: string;
  theme: ShadowTheme;
  eras?: ShadowEra[];
  parties?: PartyId[];
  bands?: OfficeBand[];
  personalities?: PersonalityId[];
  requireFlags?: string[];
  forbidFlags?: string[];
  weight?: number;
  title: string;
  pitch: string;
  riskNote: string;
  win: ShadowOutcomeCopy;
  lose: ShadowOutcomeCopy;
  setFlagsWin?: string[];
  setFlagsLose?: string[];
}

export interface PendingShadow {
  offer: ShadowOffer;
  /** Precomputado: true = verde / atajo */
  win: boolean;
}

export interface ShadowBeat {
  offerId: string;
  theme: ShadowTheme;
  title: string;
  win: boolean;
  punch: string;
  stim: string[];
  fromOffice: OfficeId;
  toOffice: OfficeId;
  quality: Quality;
  valence: 'up' | 'flat' | 'down';
  ratingBefore: number;
  ratingAfter: number;
  partyAfter: PartyId;
}
