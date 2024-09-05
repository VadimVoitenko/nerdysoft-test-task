import { createAction, props } from '@ngrx/store';
import { IQuiz } from '../../interfaces/IQuiz';

export const loadQuizzes = createAction('[Quiz] Load Quizzes');

export const loadQuizzesSuccess = createAction(
  '[Quiz] Load Quizzes Success',
  props<{ quizzes: IQuiz[] }>()
);

export const loadQuizzesFailure = createAction(
  '[Quiz] Load Quizzes Failure',
  props<{ error: string }>()
);
