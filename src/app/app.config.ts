import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { quizReducer } from './modules/home/store/quiz/quiz.reducer';
import { provideEffects } from '@ngrx/effects';
import { QuizEffects } from './modules/home/store/quiz/quiz.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ quizState: quizReducer }),
    provideState({ name: 'quizState', reducer: quizReducer }),
    provideEffects([QuizEffects])
  ],
};
