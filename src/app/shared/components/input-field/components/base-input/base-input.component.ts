import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ERROR_MESSAGE_CONSTANT } from '@sharedConstants/error-message.constant';

import {
  AttributeKeys,
  ATTRIBUTES_CONSTANT,
} from '@sharedConstants/form-fields.constant';

@Component({
  selector: 'app-base-input',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseInputComponent {
  @Input() disabled: boolean = false;
  @Output() blurred = new EventEmitter<FocusEvent>();

  protected readonly attributes = ATTRIBUTES_CONSTANT;
  protected readonly errorMessages = ERROR_MESSAGE_CONSTANT;

  #value?: string;
  #key?: AttributeKeys;

  constructor(@Optional() protected readonly ngControl: NgControl) {}

  get value(): string | undefined {
    return this.#value;
  }

  @Input() set value(value: string | undefined) {
    this.#value = value;
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }

  get key(): AttributeKeys {
    return (
      this.#key ?? (this.ngControl?.name?.toString() as AttributeKeys) ?? ''
    );
  }

  onValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.value = value;
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
  }

  onBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }
}
