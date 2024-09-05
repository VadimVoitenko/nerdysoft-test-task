import { IQuiz } from './IQuiz';

export interface IQuizState {
  quizzes: IQuiz[];
  error: string | null;
}
