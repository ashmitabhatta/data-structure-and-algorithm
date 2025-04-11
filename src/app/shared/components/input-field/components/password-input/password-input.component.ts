import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@materialModule/material.module';
import { FormErrorPipe } from '@sharedPipes/form-error/form-error.pipe';
import { CustomMatInputDirective } from '../../directives/custom-mat-input.directive';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    TranslateModule,
    MaterialModule,
    CustomMatInputDirective,
    FormErrorPipe,
  ],
  template: `
    <mat-form-field appearance="outline" color="primary" class="input">
      <mat-label>{{ attributes[key].label | translate }}</mat-label>
      <input
        customMatInput
        [type]="hide ? 'password' : 'text'"
        [value]="value"
        [disabled]="disabled"
        [placeholder]="attributes[key].placeholder | translate"
        (input)="onValueChange($event)"
        (blur)="onBlur($event)"
      />
      <mat-error
        [innerHTML]="
          (ngControl.errors
            | formError : { errorMessage: errorMessages[key] }) ?? ''
            | translate
        "
      />
      <button mat-icon-button type="button" matSuffix (click)="hide = !hide">
        <mat-icon class="icon-clr-medium">
          {{ hide ? 'visibility_off' : 'visibility' }}
        </mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: `
    .input {
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent extends BaseInputComponent {
  @Input() hide?: boolean = true;
}
