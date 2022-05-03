import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../services/app.service';
import { ResultDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  results!: any;
  score!: any;
  loading = true;

  constructor(private appService: AppService, private dialog: MatDialog) {
    this.score = localStorage.getItem('score');
    if (this.score) {
      this.saveResult();
    }
  }

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.loading = true;
    this.appService.getResults().subscribe(
      (response) => {
        this.loading = false;
        this.results = response.data;
      },
      (err) => {
        this.loading = false;
        console.log(err.error.message);
      }
    );
  }

  saveResult() {
    const dialogRef = this.dialog
      .open(ResultDialogComponent, {
        data: {
          title: 'Save Previous Result',
          score: this.score,
          action: 'create',
          action_no: 'Cancel',
          action_yes: 'Save',
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(
        (response) => {
          this.getResults();
        },
        (err) => {
          console.log(err.error.message);
        }
      );
  }
}
