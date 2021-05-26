// src/app/app.component.ts

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fg = new FormGroup({
    date: new FormControl(new Date().toISOString()),
  });

  get date() {
    return this.fg.get('date');
  }
}
