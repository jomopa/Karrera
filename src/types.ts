export type Screen =
  | 'home'
  | 'create'
  | 'event'
  | 'quiz'
  | 'result'
  | 'legacy'
  | 'shadow'
  | 'shadowResult'
  | 'sala'
  | 'salaResult';

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

/** Tipo de ronda en el calendario de carrera (12 turnos) */
export type TurnKind = 'decision' | 'quiz' | 'sala';

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
  seenQuizIds: string[];
  seenShadowIds: string[];
  seenSalaIds: string[];
  seenSalaRules: string[];
  seenReactions: string[];
  /** Ofertas de sombra presentadas (aceptadas o saltadas) */
  shadowCount: number;
  /** Si true, la próxima oportunidad de oferta se salta (anti-rachas) */
  shadowCooldown: boolean;
  /** Calendario fijo de la partida: 6 decision + 3 quiz + 3 sala, barajado */
  turnPlan: TurnKind[];
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

export type ShadowEra = 'zap' | 'rajoy' | 'bloqueo' | 'sanchez' | 'tarde';

export interface PendingEvent {
  event: YearEvent;
  variant: EventVariant;
  polls: PollRow[];
  yearFrom: number;
  yearTo: number;
}

export interface QuizQuestion {
  id: string;
  eras: ShadowEra[];
  prompt: string;
  correct: string;
  wrong: string;
}

export interface PendingQuiz {
  question: QuizQuestion;
  options: [string, string];
  correctIndex: 0 | 1;
  polls: PollRow[];
  yearFrom: number;
  yearTo: number;
}

export type ShadowTheme = 'corrupcion' | 'traicion' | 'chantaje' | 'caja_b' | 'filtracion' | 'enchufe';

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

/** Lecturas posibles en Lectura de sala (léxico fijo) */
export type SalaReading =
  | 'ascienden'
  | 'aparcan'
  | 'usan'
  | 'queman'
  | 'mensajero'
  | 'rumor_trampa'
  | 'callar'
  | 'hablar';

export type SalaRuleId =
  | 'sonrisa_cero'
  | 'bronca_llamada'
  | 'eufemismo_no'
  | 'micro_fusible'
  | 'silencio_barones'
  | 'encuesta_foto'
  | 'titular_lista'
  | 'cafe_sin_prisa'
  | 'favor_visible'
  | 'ausencia_whatsapp';

export type SalaRoom = 'aparato' | 'media' | 'calle' | 'institucional' | 'intimidad' | 'faccion';

export type SalaSignalRole = 'dominant' | 'support' | 'noise';

export interface SalaSignal {
  text: string;
  role: SalaSignalRole;
  /** Ruido escrito para tentar este sesgo de personalidad */
  tempt?: PersonalityId;
}

export interface SalaCard {
  id: string;
  ruleId: SalaRuleId;
  eras: ShadowEra[];
  room: SalaRoom;
  frame: string;
  signals: [SalaSignal, SalaSignal, SalaSignal];
  options: [SalaReading, SalaReading, SalaReading];
  correct: SalaReading;
  parties?: PartyId[];
  bands?: OfficeBand[];
  requireFlags?: string[];
  forbidFlags?: string[];
  weight?: number;
}

export interface PendingSala {
  card: SalaCard;
  /** Señales en orden de presentación (barajado) */
  signals: [SalaSignal, SalaSignal, SalaSignal];
  yearFrom: number;
}

export interface SalaBeat {
  cardId: string;
  ruleId: SalaRuleId;
  correct: boolean;
  resistedTempt: boolean;
  punch: string;
  lesson: string;
  reading: SalaReading;
  valence: 'up' | 'flat' | 'down';
  yearFrom: number;
  yearTo: number;
  fromOffice: OfficeId;
  toOffice: OfficeId;
  quality: Quality;
  ratingBefore: number;
  ratingAfter: number;
}
