import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class QuizDialogComponent implements OnInit {
  results!: any;
  constructor(
    private router: Router,
    private appService: AppService,
    public dialogRef: MatDialogRef<QuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  submit() {
    localStorage.setItem('score', this.data.score);
    this.router.navigate(['/results']);
    this.dialogRef.close();
  }

  cancel() {
    localStorage.removeItem('score');
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
