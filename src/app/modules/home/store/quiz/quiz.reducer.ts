import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './quiz.actions';
import { IQuiz, IQuizResult } from './quiz.model';

export interface QuizState {
  quizzes: IQuiz[];
  selectedQuiz: IQuiz | null;
  quizResult: IQuizResult | null;
  isLoading: boolean;
  error: string;
}

export const initialState: QuizState = {
  quizzes: [],
  selectedQuiz: null,
  quizResult: null,
  isLoading: false,
  error: '',
};

export const quizReducers = createReducer(
  initialState,
  on(QuizActions.loadQuizzes, (state) => ({ ...state, isLoading: true })),
  on(QuizActions.loadQuizzesSuccess, (state, { quizzes }) => ({
    ...state,
    quizzes,
    isLoading: false,
  })),
  on(QuizActions.loadQuizzesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(QuizActions.selectQuizById, (state, { quizId }) => ({
    ...state,
    selectedQuiz: state.quizzes.find((quiz) => quiz.id === quizId) || null,
  })),
  on(QuizActions.loadSelectedQuizFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(QuizActions.submitQuizResults, (state, { answers, quizId, timeTaken }) => {
    const quiz = state.quizzes.find((quiz) => quiz.id === quizId);
    return {
      ...state,
      quizResult: {
        quizId,
        quiz: quiz!,
        answers,
        timeTaken,
      },
    };
  })
);
