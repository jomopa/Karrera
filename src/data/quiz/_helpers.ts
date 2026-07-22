import type { QuizQuestion, ShadowEra } from '../../types';

export function Q(
  id: string,
  eras: ShadowEra[],
  prompt: string,
  correct: string,
  wrong: string,
): QuizQuestion {
  return { id, eras, prompt, correct, wrong };
}
