import { IQuizState } from '../../interfaces/IQuizState';
import { createReducer, on } from '@ngrx/store';
import { initialQuizState } from './quiz.state';
import { loadQuizzesSuccess, loadQuizzesFailure } from './quiz.actions';

export const quizReducer = createReducer(
  initialQuizState,
  on(loadQuizzesSuccess, (state, { quizzes }) => ({
    ...state,
    quizzes: quizzes,
    error: null,
  })),
  on(loadQuizzesFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
