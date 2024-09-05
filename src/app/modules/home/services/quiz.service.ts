import { IApiQuestion } from './../interfaces/IAPIQuestion';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IQuiz } from '../store/quiz/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=50&type=multiple';

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<IQuiz[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const quizzes = [];
        for (let i = 0; i < 10; i++) {
          const questions = response.results
            .slice(i * 5, i * 5 + 5)
            .map((item: any) => ({
              id: item.question,
              text: item.question,
              answers: [...item.incorrect_answers, item.correct_answer].sort(
                () => Math.random() - 0.5
              ),
              correctAnswer: item.correct_answer,
            }));
          quizzes.push({ id: i + 1, name: `Quiz ${i + 1}`, questions });
        }
        return quizzes;
      })
    );
  }
}
