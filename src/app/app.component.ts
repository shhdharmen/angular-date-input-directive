import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fg = new FormGroup({
    date: new FormControl(''),
  });

  get date() {
    return this.fg.get('date');
  }
}
