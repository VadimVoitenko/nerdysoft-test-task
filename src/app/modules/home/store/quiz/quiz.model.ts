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
