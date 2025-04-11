import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputRendererDirective } from './directives/input-renderer.directive';
import { InputConfig } from './types/input.types';

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
  template: `
    <ng-container
      appInputRenderer
      [value]="value"
      [inputConfig]="inputConfig"
      (blurred)="onTouched?.()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements ControlValueAccessor {
  onChange?: (value: string | undefined) => void;
  onTouched?: () => void;
  disabled: boolean = false;
  #value?: string;
  #inputConfig?: InputConfig;

  get value(): string | undefined {
    return this.#value;
  }

  set value(value: string | undefined) {
    this.#value = value;
  }

  @Input() set inputConfig(value: InputConfig | undefined) {
    if (!value) {
      return;
    }
    this.#inputConfig = { ...(this.#inputConfig ?? {}), ...value };
  }

  get inputConfig(): InputConfig | undefined {
    return this.#inputConfig;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
