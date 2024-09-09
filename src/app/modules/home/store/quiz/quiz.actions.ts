import { createAction, props } from '@ngrx/store';
import { IQuiz } from './quiz.model';

export const loadQuizzes = createAction('[Quiz] Load Quizzes');

export const loadQuizzesSuccess = createAction(
  '[Quiz] Load Quizzes Success',
  props<{ quizzes: IQuiz[] }>()
);

export const loadQuizzesFailure = createAction(
  '[Quiz] Load Quizzes Failure',
  props<{ error: string }>()
);

export const selectQuizById = createAction(
  '[Quiz] Select Quiz By Id',
  props<{ quizId: number }>()
);

export const loadSelectedQuizSuccess = createAction(
  '[Quiz] Load Selected Quiz Success',
  props<{ selectedQuiz: IQuiz }>()
);

export const loadSelectedQuizFailure = createAction(
  '[Quiz] Load Selected Quiz Failure',
  props<{ error: string }>()
);

export const submitQuizResults = createAction(
  '[Quiz] Submit Quiz Results',
  props<{ answers: string[]; quizId: number; timeTaken: number }>()
);
