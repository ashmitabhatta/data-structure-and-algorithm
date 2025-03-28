import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputRendererDirective } from './directives/input-renderer.directive';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [InputRendererDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFieldComponent,
      multi: true,
    },
  ],
  template: `<ng-container appInputRenderer [value]="value"></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements ControlValueAccessor {
  onChange?: (value: string | undefined) => void;
  onTouched?: () => void;
  disabled: boolean = false;
  #value?: string;

  get value(): string | undefined {
    return this.#value;
  }

  set value(value: string | undefined) {
    this.#value = value;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
