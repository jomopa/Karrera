import type { QuizQuestion } from '../../types';
import { QUIZ_BLOQUEO } from './bloqueo';
import { QUIZ_RAJOY } from './rajoy';
import { QUIZ_SANCHEZ } from './sanchez';
import { QUIZ_TARDE } from './tarde';
import { QUIZ_ZAP } from './zap';

export const ALL_QUIZZES: QuizQuestion[] = [
  ...QUIZ_ZAP,
  ...QUIZ_RAJOY,
  ...QUIZ_BLOQUEO,
  ...QUIZ_SANCHEZ,
  ...QUIZ_TARDE,
];

export { QUIZ_ZAP, QUIZ_RAJOY, QUIZ_BLOQUEO, QUIZ_SANCHEZ, QUIZ_TARDE };
