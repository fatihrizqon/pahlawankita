import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PahlawanKita';
  light = true;

  changeMode(event: any) {
    document.body.classList.toggle('darkMode');
    this.light = !this.light;
  }
}
