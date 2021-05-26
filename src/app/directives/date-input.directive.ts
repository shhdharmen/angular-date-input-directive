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

  @HostListener('input', ['$event.target.valueAsNumber'])
  onInput = (_: any) => {};

  writeValue(dateISOString: string): void {
    const date = new Date(dateISOString);

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
    this.onInput = (value: number) => {
      fn(this.getDate(value).toISOString());
    };
  }
  registerOnTouched(fn: any): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    return control.value && this.isValidDate(date) ? null : { date: true };
  }

  getTwoDigits(value: string | number): string {
    return ('0' + value).slice(-2);
  }

  isValidDate(d: Date | number | null) {
    return d instanceof Date && !isNaN(d as unknown as number);
  }

  getDate(value: number) {
    if (value) {
      const dateObj = new Date(value);
      return this.isValidDate(dateObj) ? dateObj : { toISOString: () => null };
    }
    return { toISOString: () => null };
  }
}
