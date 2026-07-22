import { create } from 'zustand';
import { buildPending, createPlayer, isFinished, resolveChoice } from './engine/game';
import { computeLegacy } from './engine/legacy';
import { buildPendingQuiz } from './engine/quizPicker';
import { resolveQuiz } from './engine/quizResolve';
import { buildPendingSala } from './engine/salaPicker';
import { resolveSala } from './engine/salaResolve';
import { rollPendingShadow, shouldPresentShadow } from './engine/shadowPicker';
import { clearShadowCooldown, markShadowPresented, resolveShadow } from './engine/shadowResolve';
import { turnKindOf } from './engine/turnPlan';
import type {
  ChoiceKind,
  Legacy,
  PartyId,
  PendingEvent,
  PendingQuiz,
  PendingSala,
  PendingShadow,
  PersonalityId,
  Player,
  SalaBeat,
  SalaReading,
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
  pendingQuiz: PendingQuiz | null;
  pendingSala: PendingSala | null;
  pendingShadow: PendingShadow | null;
  beat: TurnBeat | null;
  salaBeat: SalaBeat | null;
  shadowBeat: ShadowBeat | null;
  legacy: Legacy | null;
  setScreen: (s: Screen) => void;
  setDraft: (p: Partial<GameState['draft']>) => void;
  nextStep: () => void;
  prevStep: () => void;
  start: () => void;
  choose: (kind: ChoiceKind) => void;
  answerQuiz: (optionIndex: 0 | 1) => void;
  answerSala: (reading: SalaReading) => void;
  continueAfterResult: () => void;
  continueAfterSala: () => void;
  skipShadow: () => void;
  acceptShadow: () => void;
  continueAfterShadow: () => void;
  reset: () => void;
}

/** Calendario de carrera: decision | quiz | sala según turnPlan */
function goToNextRound(player: Player) {
  const kind = turnKindOf(player);
  if (kind === 'quiz') {
    return {
      player,
      pending: null as PendingEvent | null,
      pendingQuiz: buildPendingQuiz(player),
      pendingSala: null as PendingSala | null,
      beat: null,
      salaBeat: null,
      pendingShadow: null,
      shadowBeat: null,
      screen: 'quiz' as const,
    };
  }
  if (kind === 'sala') {
    return {
      player,
      pending: null as PendingEvent | null,
      pendingQuiz: null as PendingQuiz | null,
      pendingSala: buildPendingSala(player),
      beat: null,
      salaBeat: null,
      pendingShadow: null,
      shadowBeat: null,
      screen: 'sala' as const,
    };
  }
  return {
    player,
    pending: buildPending(player),
    pendingQuiz: null as PendingQuiz | null,
    pendingSala: null as PendingSala | null,
    beat: null,
    salaBeat: null,
    pendingShadow: null,
    shadowBeat: null,
    screen: 'event' as const,
  };
}

function tryShadowOrRound(player: Player) {
  let p = player;
  if (p.shadowCooldown) {
    p = clearShadowCooldown(p);
    return goToNextRound(p);
  }
  if (shouldPresentShadow(p)) {
    const rolled = rollPendingShadow(p);
    if (rolled) {
      return {
        player: p,
        pendingShadow: rolled,
        beat: null,
        salaBeat: null,
        pending: null,
        pendingQuiz: null,
        pendingSala: null,
        shadowBeat: null,
        screen: 'shadow' as const,
      };
    }
  }
  return goToNextRound(p);
}

export const useGame = create<GameState>((set, get) => ({
  screen: 'home',
  step: 0,
  draft: { name: '', party: null, personality: null },
  player: null,
  pending: null,
  pendingQuiz: null,
  pendingSala: null,
  pendingShadow: null,
  beat: null,
  salaBeat: null,
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
    set({
      ...goToNextRound(player),
      legacy: null,
    });
  },

  choose: (kind) => {
    const { player, pending } = get();
    if (!player || !pending) return;
    const { player: next, beat } = resolveChoice(player, pending, kind);
    set({
      player: next,
      beat,
      pending: null,
      pendingQuiz: null,
      pendingSala: null,
      salaBeat: null,
      screen: 'result',
    });
  },

  answerQuiz: (optionIndex) => {
    const { player, pendingQuiz } = get();
    if (!player || !pendingQuiz) return;
    const { player: next, beat } = resolveQuiz(player, pendingQuiz, optionIndex);
    set({
      player: next,
      beat,
      pending: null,
      pendingQuiz: null,
      pendingSala: null,
      salaBeat: null,
      screen: 'result',
    });
  },

  answerSala: (reading) => {
    const { player, pendingSala } = get();
    if (!player || !pendingSala) return;
    const { player: next, beat } = resolveSala(player, pendingSala, reading);
    set({
      player: next,
      salaBeat: beat,
      pendingSala: null,
      pending: null,
      pendingQuiz: null,
      beat: null,
      screen: 'salaResult',
    });
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
        salaBeat: null,
        pending: null,
        pendingQuiz: null,
        pendingSala: null,
        pendingShadow: null,
        shadowBeat: null,
      });
      return;
    }
    set(tryShadowOrRound(player));
  },

  continueAfterSala: () => {
    const { player } = get();
    if (!player) return;
    if (isFinished(player)) {
      set({
        player: { ...player, retired: true },
        legacy: computeLegacy(player),
        screen: 'legacy',
        beat: null,
        salaBeat: null,
        pending: null,
        pendingQuiz: null,
        pendingSala: null,
        pendingShadow: null,
        shadowBeat: null,
      });
      return;
    }
    set({ ...tryShadowOrRound(player), salaBeat: null });
  },

  skipShadow: () => {
    const { player, pendingShadow } = get();
    if (!player || !pendingShadow) return;
    const next = markShadowPresented(player, pendingShadow.offer.id);
    set(goToNextRound(next));
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
    set(goToNextRound(player));
  },

  reset: () =>
    set({
      screen: 'home',
      step: 0,
      draft: { name: '', party: null, personality: null },
      player: null,
      pending: null,
      pendingQuiz: null,
      pendingSala: null,
      pendingShadow: null,
      beat: null,
      salaBeat: null,
      shadowBeat: null,
      legacy: null,
    }),
}));
