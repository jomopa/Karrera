import type {
  OfficeBand,
  PartyId,
  PersonalityId,
  SalaCard,
  SalaReading,
  SalaRoom,
  SalaRuleId,
  SalaSignal,
  SalaSignalRole,
  ShadowEra,
} from '../../types';

export function sig(
  text: string,
  role: SalaSignalRole,
  tempt?: PersonalityId,
): SalaSignal {
  return tempt ? { text, role, tempt } : { text, role };
}

export function card(
  id: string,
  ruleId: SalaRuleId,
  opts: {
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
  },
): SalaCard {
  if (!opts.options.includes(opts.correct)) {
    throw new Error(`Sala card ${id}: correct not in options`);
  }
  const roles = opts.signals.map((s) => s.role).sort().join(',');
  if (roles !== 'dominant,noise,support') {
    throw new Error(`Sala card ${id}: need 1 dominant, 1 support, 1 noise (got ${roles})`);
  }
  return { id, ruleId, weight: 10, ...opts };
}
