import { Component, OnInit } from '@angular/core';
// import { IQuiz } from '../../interfaces/IQuiz';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectLoading,
  selectQuizzes,
} from '../../store/quiz/quiz.selectors';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { loadQuizzes } from '../../store/quiz/quiz.actions';
import { IQuiz } from '../../store/quiz/quiz.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  quizzes$!: Observable<IQuiz[]>;
  loading$!: Observable<boolean>;
  error$?: Observable<string | null>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.quizzes$ = this.store.select(selectQuizzes);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);

    this.quizzes$.subscribe((quizzes) => {
      if (quizzes.length === 0) {
        this.store.dispatch(loadQuizzes());
      }
    });
  }

  onLuckyClick(): void {
    this.quizzes$.subscribe((quizzes) => {
      if (quizzes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        const randomQuiz = quizzes[randomIndex];
        this.selectQuiz(randomQuiz.id);
      } else {
        console.error('No quizzes available to select');
      }
    });
  }

  selectQuiz(quizId: number) {
    this.router.navigate(['quiz/play', quizId]);
  }
}
