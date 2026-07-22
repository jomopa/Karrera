import type { ChoiceDef, EventVariant, OfficeBand, PartyId, PersonalityId, YearEvent } from '../../types';

type ChoiceExtra =
  | PartyId
  | {
      switchTo?: PartyId;
      setFlagsOk?: string[];
      setFlagsFail?: string[];
    };

export function C(
  kind: 'safe' | 'risk',
  label: string,
  hint: string,
  ok: string,
  fail: string,
  advanceBias: number,
  extra?: ChoiceExtra,
): ChoiceDef {
  if (typeof extra === 'string') {
    return { kind, label, hint, ok, fail, advanceBias, switchTo: extra };
  }
  return { kind, label, hint, ok, fail, advanceBias, ...extra };
}

export function V(
  id: string,
  opts: {
    parties?: PartyId[];
    bands?: OfficeBand[];
    personalities?: PersonalityId[];
    requireFlags?: string[];
    forbidFlags?: string[];
    hook?: string;
    safe: ChoiceDef;
    risk: ChoiceDef;
  },
): EventVariant {
  return { id, ...opts };
}

export function E(
  id: string,
  year: number,
  title: string,
  lore: string,
  variants: EventVariant[],
  weight = 10,
  flags?: { requireFlags?: string[]; forbidFlags?: string[] },
): YearEvent {
  return { id, year, title, lore, variants, weight, ...flags };
}
