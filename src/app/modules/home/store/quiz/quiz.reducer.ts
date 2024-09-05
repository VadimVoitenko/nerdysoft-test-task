import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './quiz.actions';
import { IQuiz } from './quiz.model';

export interface QuizState {
  quizzes: IQuiz[];
  loading: boolean;
  error: any;
}

export const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.loadQuizzes, (state) => ({ ...state, loading: true })),
  on(QuizActions.loadQuizzesSuccess, (state, { quizzes }) => ({
    ...state,
    quizzes,
    loading: false,
  })),
  on(QuizActions.loadQuizzesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
