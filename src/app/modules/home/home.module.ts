import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './pages/play/play.component';
// import { FinishComponent } from './pages/finish/finish.component';
import { QuizService } from './services/quiz.service';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play/:id', component: PlayComponent },
  // { path: 'finish/:id', component: FinishComponent },
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
