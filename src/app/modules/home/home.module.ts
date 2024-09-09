import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './pages/play/play.component';
import { FinishComponent } from './pages/finish/finish.component';
import { QuizService } from './services/quiz.service';
import { MatButtonModule } from '@angular/material/button';
import { animation } from '@angular/animations';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'play/:id',
    component: PlayComponent,
    data: { animation: 'PlayPage' },
  },
  {
    path: 'finish/:id',
    component: FinishComponent,
    data: { animation: 'FinishPage' },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
  providers: [QuizService],
})
export class HomeModule {}
