import { IQuiz } from '../store/quiz/quiz.model';

export interface IQuizState {
  quizzes: IQuiz[];
  error: string | null;
}
