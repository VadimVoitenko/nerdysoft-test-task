import { IQuizState } from '../../interfaces/IQuizState';
import { initialState, QuizState } from './quiz.reducer';

export const initialQuizState: IQuizState = {
  quizzes: [],
  selectedQuiz: null,
  isLoading:false,
  error: null,
};

export interface AppState {
  quiz: QuizState;
}
