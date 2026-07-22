import type {
  OfficeBand,
  PartyId,
  PersonalityId,
  ShadowEra,
  ShadowOffer,
  ShadowOutcomeCopy,
  ShadowTheme,
} from '../../types';

type ShadowOpts = {
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
  riskNote?: string;
  win: ShadowOutcomeCopy;
  lose: ShadowOutcomeCopy;
  setFlagsWin?: string[];
  setFlagsLose?: string[];
};

export function S(id: string, opts: ShadowOpts): ShadowOffer {
  return {
    id,
    riskNote: opts.riskNote ?? '70% atajo · 30% precipicio',
    ...opts,
  };
}
