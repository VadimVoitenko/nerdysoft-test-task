import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuizActions from './quiz.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { QuizService } from '../../services/quiz.service';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private quizService: QuizService) {}

  loadQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.loadQuizzes),
      mergeMap(() =>
        this.quizService.getQuizzes().pipe(
          map((quizzes) => QuizActions.loadQuizzesSuccess({ quizzes })),
          catchError((error) => of(QuizActions.loadQuizzesFailure({ error })))
        )
      )
    )
  );
}
