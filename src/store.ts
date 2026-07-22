import { create } from 'zustand';
import { buildPending, createPlayer, isFinished, resolveChoice } from './engine/game';
import { computeLegacy } from './engine/legacy';
import { rollPendingShadow, shouldPresentShadow } from './engine/shadowPicker';
import { clearShadowCooldown, markShadowPresented, resolveShadow } from './engine/shadowResolve';
import type {
  ChoiceKind,
  Legacy,
  PartyId,
  PendingEvent,
  PendingShadow,
  PersonalityId,
  Player,
  Screen,
  ShadowBeat,
  TurnBeat,
} from './types';

interface GameState {
  screen: Screen;
  step: number;
  draft: { name: string; party: PartyId | null; personality: PersonalityId | null };
  player: Player | null;
  pending: PendingEvent | null;
  pendingShadow: PendingShadow | null;
  beat: TurnBeat | null;
  shadowBeat: ShadowBeat | null;
  legacy: Legacy | null;
  setScreen: (s: Screen) => void;
  setDraft: (p: Partial<GameState['draft']>) => void;
  nextStep: () => void;
  prevStep: () => void;
  start: () => void;
  choose: (kind: ChoiceKind) => void;
  continueAfterResult: () => void;
  skipShadow: () => void;
  acceptShadow: () => void;
  continueAfterShadow: () => void;
  reset: () => void;
}

function goToEvent(player: Player) {
  const pending = buildPending(player);
  return { player, pending, beat: null, pendingShadow: null, shadowBeat: null, screen: 'event' as const };
}

export const useGame = create<GameState>((set, get) => ({
  screen: 'home',
  step: 0,
  draft: { name: '', party: null, personality: null },
  player: null,
  pending: null,
  pendingShadow: null,
  beat: null,
  shadowBeat: null,
  legacy: null,

  setScreen: (screen) => set({ screen }),
  setDraft: (p) => set({ draft: { ...get().draft, ...p } }),
  nextStep: () => set({ step: Math.min(2, get().step + 1) }),
  prevStep: () => set({ step: Math.max(0, get().step - 1) }),

  start: () => {
    const { name, party, personality } = get().draft;
    if (!party || !personality) return;
    const player = createPlayer(name, party, personality);
    const pending = buildPending(player);
    set({
      player,
      pending,
      pendingShadow: null,
      beat: null,
      shadowBeat: null,
      legacy: null,
      screen: 'event',
    });
  },

  choose: (kind) => {
    const { player, pending } = get();
    if (!player || !pending) return;
    const { player: next, beat } = resolveChoice(player, pending, kind);
    set({ player: next, beat, pending: null, screen: 'result' });
  },

  continueAfterResult: () => {
    const { player } = get();
    if (!player) return;
    if (isFinished(player)) {
      set({
        player: { ...player, retired: true },
        legacy: computeLegacy(player),
        screen: 'legacy',
        beat: null,
        pending: null,
        pendingShadow: null,
        shadowBeat: null,
      });
      return;
    }

    let p = player;
    if (p.shadowCooldown) {
      p = clearShadowCooldown(p);
      set(goToEvent(p));
      return;
    }

    if (shouldPresentShadow(p)) {
      const rolled = rollPendingShadow(p);
      if (rolled) {
        set({
          player: p,
          pendingShadow: rolled,
          beat: null,
          pending: null,
          shadowBeat: null,
          screen: 'shadow',
        });
        return;
      }
    }

    set(goToEvent(p));
  },

  skipShadow: () => {
    const { player, pendingShadow } = get();
    if (!player || !pendingShadow) return;
    const next = markShadowPresented(player, pendingShadow.offer.id);
    set(goToEvent(next));
  },

  acceptShadow: () => {
    const { player, pendingShadow } = get();
    if (!player || !pendingShadow) return;
    const { player: next, beat } = resolveShadow(player, pendingShadow);
    set({
      player: next,
      shadowBeat: beat,
      pendingShadow: null,
      screen: 'shadowResult',
    });
  },

  continueAfterShadow: () => {
    const { player } = get();
    if (!player) return;
    set(goToEvent(player));
  },

  reset: () =>
    set({
      screen: 'home',
      step: 0,
      draft: { name: '', party: null, personality: null },
      player: null,
      pending: null,
      pendingShadow: null,
      beat: null,
      shadowBeat: null,
      legacy: null,
    }),
}));
