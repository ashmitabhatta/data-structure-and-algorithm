import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  Directive,
  DoCheck,
  ElementRef,
  Inject,
  NgZone,
  Optional,
  Self,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput } from '@angular/material/input';

@Directive({
  selector: `
    input[customMatInput],
    textarea[customMatInput],
    select[matNativeControl],
    input[matNativeControl],
    textarea[matNativeControl],
  `,
  exportAs: 'customMatInput',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomMatInputDirective,
    },
  ],
  standalone: true,
})
export class CustomMatInputDirective extends MatInput implements DoCheck {
  constructor(
    _elementRef: ElementRef<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    _platform: Platform,
    @Optional() ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Self()
    @Inject(MAT_INPUT_VALUE_ACCESSOR)
    inputValueAccessor: any,
    _autofillMonitor: AutofillMonitor,
    ngZone: NgZone,
    @Optional()
    @Inject(MAT_FORM_FIELD)
    protected override _formField?: MatFormField
  ) {
    super(
      _elementRef,
      _platform,
      ngControl,
      _parentForm,
      _parentFormGroup,
      _defaultErrorStateMatcher,
      inputValueAccessor,
      _autofillMonitor,
      ngZone,
      _formField
    );
  }
}
