import { Component, OnInit } from '@angular/core';
import { IQuiz } from '../../interfaces/IQuiz';
import { QuizService } from '../../services/quiz.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  quizzes: IQuiz[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe((questions) => {
      this.quizzes = this.quizService.generateQuizzes(questions);
    });
  }

  onLuckyClick(): void {
    const randomIndex = Math.floor(Math.random() * this.quizzes.length);
    const randomQuiz = this.quizzes[randomIndex];
    console.log('Selected Quiz ID: ', randomQuiz.id);
    this.router.navigate(['quiz/play', randomQuiz.id]);
  }

  onQuizSelect(quizId: number): void {
    console.log('Selected Quiz ID: ', quizId);
    this.router.navigate(['quiz/play', quizId]);
  }
}
