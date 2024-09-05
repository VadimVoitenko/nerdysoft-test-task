import { IApiQuestion } from './../interfaces/IAPIQuestion';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from '../interfaces/IQuestion';
import { IQuiz } from '../interfaces/IQuiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=50&type=multiple';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<IQuestion[]> {
    return this.http.get<{ results: IApiQuestion[] }>(this.apiUrl).pipe(
      map((response) =>
        response.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(
            () => 0.5 - Math.random()
          ),
          correctAnswer: q.correct_answer,
        }))
      )
    );
  }

  generateQuizzes(questions: IQuestion[]): IQuiz[] {
    const quizzes: IQuiz[] = [];
    const quizSize = 5;

    for (let i = 0; i < 10; i++) {
      const quizQuestions = questions.slice(i * quizSize, (i + 1) * quizSize);
      quizzes.push({
        id: i + 1,
        name: `Quiz ${i + 1}`,
        questions: quizQuestions,
      });
    }
    return quizzes;
  }
}
