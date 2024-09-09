import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectLoading,
  selectQuizzes,
} from '../../store/quiz/quiz.selectors';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IQuiz } from '../../store/quiz/quiz.model';
import { AppState } from '../../store/quiz/quiz.state';
import * as QuizActions from '../../store/quiz/quiz.actions';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgFor, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  quizzes$: Observable<IQuiz[]> = this.store.select(
    (state) => state.quiz.quizzes
  );
  loading$!: Observable<boolean>;
  error$?: Observable<string | null>;
  selectedQuiz: IQuiz | undefined = undefined;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.quizzes$ = this.store.select(selectQuizzes);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.quizzes$.subscribe((quizzes) => {
      if (!quizzes || quizzes.length === 0) {
        this.store.dispatch(QuizActions.loadQuizzes());
      }
    });
  }

  onLuckyClick(): void {
    this.quizzes$.subscribe((quizzes) => {
      if (quizzes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        const randomQuiz = quizzes[randomIndex];
        this.onSelectQuiz(randomQuiz.id);
      } else {
        console.error('No quizzes available to select');
      }
    });
  }

  onSelectQuiz(quizId: number) {
    this.store.dispatch(QuizActions.selectQuizById({ quizId }));
    this.router.navigate(['quiz/play', quizId]);
  }
}
