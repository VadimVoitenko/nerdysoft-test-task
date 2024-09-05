export interface IApiQuestion {
  id: string;
  category: string;
  type: string;
  difficulty: string;
  text: string;
  correct_answer: string;
  incorrect_answers: string[];
}
