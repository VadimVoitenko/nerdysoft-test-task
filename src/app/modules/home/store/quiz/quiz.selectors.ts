import { createSelector } from '@ngrx/store';
import { QuizState } from './quiz.reducer';
import { AppState } from './quiz.state';

export const selectQuizState = (state: AppState) => state.quiz;

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
  (state: QuizState) => state.isLoading
);

export const selectError = createSelector(
  selectQuizState,
  (state: QuizState) => state.error
);

export const selectSelectedQuiz = createSelector(
  selectQuizState,
  (state: QuizState) => state.selectedQuiz
);

// export const selectQuizResults = createSelector(
//   selectQuizState,
//   (state: QuizState) => state.quizResult
// );
