import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.reducer';

export const selectQuizState = createFeatureSelector<QuizState>('quiz');

export const selectQuizzes = createSelector(
  selectQuizState,
  (state: QuizState) => state.quizzes
);

export const selectQuizById = (quizId: number) =>
  createSelector(selectQuizzes, (quizzes) =>
    quizzes.find((quiz) => quiz.id === quizId)
  );

export const selectLoading = createSelector(
  selectQuizState,
  (state: QuizState) => state.loading
);

export const selectError = createSelector(
  selectQuizState,
  (state: QuizState) => state.error
);
