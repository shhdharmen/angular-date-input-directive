import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: 'input[type=date]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateInputDirective,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DateInputDirective,
      multi: true,
    },
  ],
})
export class DateInputDirective implements ControlValueAccessor, Validator {
  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2
  ) {}

  @HostListener('input', ['$event.target.value'])
  onInput = (_: any) => {};

  writeValue(dateValue: string): void {
    const date = new Date(dateValue);
    const UIValue =
      date.getFullYear() +
      '-' +
      this.getTwoDigits(date.getMonth() + 1) +
      '-' +
      this.getTwoDigits(date.getDate());
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'value',
      UIValue
    );
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onInput = (value: string) => {
      fn(this.getDateFromString(value).toISOString());
    };
  }
  registerOnTouched(fn: any): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.getDateFromString(control.value).toISOString()
      ? null
      : { date: true };
  }

  getTwoDigits(value: string | number): string {
    return ('0' + value).slice(-2);
  }

  isValidDate(d: Date | number) {
    return d instanceof Date && !isNaN(d as unknown as number);
  }

  getDateFromString(value: string) {
    if (value) {
      value = value.split('T')[0];
      const year = +value.split('-')[0];
      const month = +value.split('-')[1] - 1;
      const date = +value.split('-')[2];
      const dateObj = new Date(year, month, date);
      return this.isValidDate(dateObj) ? dateObj : { toISOString: () => null };
    }
    return { toISOString: () => null };
  }
}
