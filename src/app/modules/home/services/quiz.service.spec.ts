import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IQuiz } from '../store/quiz/quiz.model';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService],
    });
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); //verifies that no unmatched requests are outstanding
  });

  it('should retrieve quizzes from the API via GET', () => {
    const dummyQuizzes: IQuiz[] = [
      {
        id: 1,
        name: 'Quiz 1',
        questions: [
          {
            id: '1',
            text: 'Question 1?',
            answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
            correctAnswer: 'Answer 1',
          },
        ],
      },
    ];

    service.getQuizzes().subscribe((quizzes) => {
      expect(quizzes.length).toBe(1);
      expect(quizzes).toEqual(dummyQuizzes);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    expect(request.request.method).toBe('GET');
    request.flush({
      results: [
        {
          question: 'Question 1?',
          correct_answer: 'Answer 1',
          incorrect_answer: ['Answer 2', 'Answer 3', 'Answer 4'],
        },
      ],
    });
  });
  it('should handle an empty response from the API', () => {
    service.getQuizzes().subscribe((quizzes) => {
      expect(quizzes.length).toBe(0);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}`);
    request.flush({ results: [] });
  });
});
