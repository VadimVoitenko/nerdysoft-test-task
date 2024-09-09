import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Observable, of, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { selectSelectedQuiz } from '../../store/quiz/quiz.selectors';
import { Router } from '@angular/router';
import { IQuiz } from '../../store/quiz/quiz.model';
import { AppState } from '../../store/quiz/quiz.state';
import { MatButton } from '@angular/material/button';
import * as QuizActions from '../../store/quiz/quiz.actions';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, MatButton],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit, OnDestroy {
  selectedQuiz$: Observable<IQuiz | null> =
    this.store.select(selectSelectedQuiz);
  selectedQuizSubscription: Subscription = new Subscription();
  currentQuestionIndex: number = 0;
  selectedAnswer: string | null = null;
  userAnswers: string[] = [];
  totalQuestions?: number = 0;
  quizId: number | undefined = undefined;
  startTime: number | null = null;
  nextButtonText: string = 'Next Question';

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.selectedQuizSubscription = this.selectedQuiz$
      .pipe(
        first(),
        tap((quiz) => {
          this.quizId = quiz?.id;
          this.totalQuestions = quiz?.questions.length;
          this.startTime = Date.now();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.selectedQuizSubscription) {
      this.selectedQuizSubscription.unsubscribe();
    }
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  nextQuestion(): void {
    if (
      this.selectedAnswer &&
      this.currentQuestionIndex < this.totalQuestions! - 1
    ) {
      this.userAnswers.push(this.selectedAnswer);
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    } else if (
      this.selectedAnswer &&
      this.currentQuestionIndex === this.totalQuestions! - 1
    ) {
      this.userAnswers.push(this.selectedAnswer);
      const quizEndTime = Date.now();
      const timeTaken = quizEndTime - this.startTime!;

      this.store.dispatch(
        QuizActions.submitQuizResults({
          answers: this.userAnswers,
          quizId: this.quizId!,
          timeTaken,
          finishTime: this.formatTime(quizEndTime)!,
        })
      );
      this.finishQuiz();
    }
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  finishQuiz(): void {
    this.router.navigate(['/quiz/finish', this.quizId]);
  }
}
