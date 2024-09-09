export interface IQuestion {
  id: string;
  text: string;
  answers: string[];
  correctAnswer: string;
}

export interface IQuiz {
  id: number;
  name: string;
  questions: IQuestion[];
}

export interface IQuizResult {
  quizId: number;
  quiz: IQuiz;
  answers: string[];
  timeTaken: number;
  finishTime: string;
}
