import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { QuizDialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz!: any;
  question!: any;
  options!: any;
  score = 0;
  healths = [1, 2, 3];
  baseURL = this.appService.baseURL;
  counter: number = 0;
  interval: any;
  progress!: number;
  loading = false;
  quizForm!: FormGroup;
  result: any;

  constructor(
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      option: [this.result?.option, Validators.required],
    });
    this.getQuiz();
  }

  getQuiz() {
    this.loading = true;
    this.counterTime();
    this.appService.getQuiz().subscribe(
      (response) => {
        this.loading = false;
        this.options = response.options;
        this.question = response.answer;
      },
      (err) => {
        this.loading = false;
        console.log(err.error.message);
      }
    );
  }

  submit() {
    let answer = this.quizForm.get('option')?.value;
    let id = this.question[0].id;
    let name = this.question[0].name;

    if (id === answer) {
      this.openSnackBar('Yes you are correct!', 'Got It!');

      this.score = this.score + 1;
      clearInterval(this.interval);
      this.getQuiz();
    } else {
      this.healths.splice(0, 1);
      clearInterval(this.interval);
      this.getQuiz();

      if (this.healths.length === 0) {
        const score = {
          score: this.score,
        };

        this.openSnackBar(
          'Quiz is over, your score is: ' + score.score,
          'Got It!'
        );

        if (score.score > 5) {
          return this.saveResult();
        }

        this.ngOnDestroy();
        return this.router.navigate(['/']);
      }

      return this.openSnackBar(
        'Your answer is incorrect, let`s try again.',
        'Got It!'
      );
    }
  }

  counterTime() {
    this.counter = 30;
    this.progress = 100;
    this.interval = setInterval(() => {
      this.counter = this.counter - 1;
      this.progress = this.progress - this.progress / this.counter;

      if (this.counter === 0) {
        this.healths.splice(0, 1);

        if (this.healths.length === 0) {
          const score = {
            score: this.score,
          };

          this.openSnackBar(
            'Time is up and the quiz is over, your score is: ' + score.score,
            'Got It!'
          );

          if (score.score > 5) {
            return this.saveResult();
          }

          this.ngOnDestroy();
          this.router.navigate(['/']);
        }

        this.progress = 100;
        clearInterval(this.interval);
        this.getQuiz();
      }
    }, 1000);
  }

  updateColor(progress: number) {
    if (progress < 33) {
      return 'warn';
    } else if (progress > 66) {
      return 'primary';
    } else {
      return 'accent';
    }
  }

  saveResult() {
    const dialogRef = this.dialog
      .open(QuizDialogComponent, {
        data: {
          title: 'Do you want to save your result?',
          score: this.score,
          action: 'create',
          action_no: 'Cancel',
          action_yes: 'Save',
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(
        (response) => {},
        (err) => {
          console.log(err.error.message);
        }
      );
  }

  ngOnDestroy() {
    this.score = 0;
    clearInterval(this.progress);
    clearInterval(this.interval);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
