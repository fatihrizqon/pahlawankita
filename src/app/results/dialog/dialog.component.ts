import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'result-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ResultDialogComponent implements OnInit {
  result!: any;
  results!: any;
  score!: any;
  dialogForm!: FormGroup;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appService: AppService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      username: [this.result?.username, Validators.required],
    });
  }

  submit() {
    var result = {
      username: this.dialogForm.get('username')?.value,
      score: this.data.score,
    };

    this.appService.saveResult(result).subscribe(
      (response) => {
        this.openSnackBar(response.message, 'Got It!');
        localStorage.removeItem('score');
        this.dialogRef.close();
      },
      (err) => {
        console.log(err.error.message);
        this.openSnackBar(err.error.message, 'Got It!');
      }
    );
  }

  cancel() {
    localStorage.removeItem('score');
    this.dialogRef.close(false);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
