import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeModule } from './modules/home/home.module';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuizEffects } from './modules/home/store/quiz/quiz.effects';
import { quizReducer } from './modules/home/store/quiz/quiz.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
