import { IQuiz } from '../store/quiz/quiz.model';

export interface IQuizState {
  quizzes: IQuiz[];
  selectedQuiz: IQuiz | null;
  isLoading: boolean;
  error: string | null;
}
