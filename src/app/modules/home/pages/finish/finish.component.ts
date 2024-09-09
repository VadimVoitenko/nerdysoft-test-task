import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/quiz/quiz.state';
import { IQuestion, IQuizResult } from '../../store/quiz/quiz.model';
import { Router } from '@angular/router';
import { selectQuizResults } from '../../store/quiz/quiz.selectors';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, MatButton],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent implements OnInit {
  quizResult$: Observable<IQuizResult | null> =
    this.store.select(selectQuizResults);
  score: number = 0;
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  timeTaken: number = 0;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.quizResult$.subscribe((result) => {
      if (result) {
        this.totalQuestions = result.answers.length;
        this.correctAnswers = this.calculateCorrectAnswers(result);
        this.score = (this.correctAnswers / this.totalQuestions) * 100;
        this.timeTaken = result.timeTaken;
      }
    });
  }

  calculateCorrectAnswers(result: IQuizResult): number {
    let countCorrect = 0;
    result.answers.forEach((answer, index) => {
      const correctAnswer = result.quiz.questions[index].correctAnswer;
      if (answer === correctAnswer) {
        countCorrect++;
      }
    });
    return countCorrect;
  }

  onCancel() {
    this.router.navigate(['/quiz/home']);
  }
}
