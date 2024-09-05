import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { quizReducer } from './modules/home/store/quiz/quiz.reducer';
import { provideEffects } from '@ngrx/effects';
import { QuizEffects } from './modules/home/store/quiz/quiz.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ quiz: quizReducer }),
    // provideState({ name: 'quizState', reducer: quizReducer }),
    provideEffects([QuizEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
