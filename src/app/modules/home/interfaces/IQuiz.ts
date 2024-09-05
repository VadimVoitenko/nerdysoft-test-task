import { IQuestion } from './IQuestion';

export interface IQuiz {
  id: number;
  name: string;
  questions: IQuestion[];
}
