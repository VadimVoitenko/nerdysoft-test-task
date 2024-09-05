import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuizService } from '../../services/quiz.service';
import {
  loadQuizzes,
  loadQuizzesSuccess,
  loadQuizzesFailure,
} from './quiz.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class QuizEffects {
  loadQuizzes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuizzes),
      mergeMap(() =>
        this.quizService.getQuestions().pipe(
          map((questions) => {
            const quizzes = this.quizService.generateQuizzes(questions);
            return loadQuizzesSuccess({ quizzes });
          }),
          catchError((error) =>
            of(loadQuizzesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
