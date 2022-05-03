import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from './material.module';
import { QuizDialogComponent } from './quiz/dialog/dialog.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { AppService } from './services/app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultDialogComponent } from './results/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    QuizComponent,
    ResultsComponent,
    QuizDialogComponent,
    ResultDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
