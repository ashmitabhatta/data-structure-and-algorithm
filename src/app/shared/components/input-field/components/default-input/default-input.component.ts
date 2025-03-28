import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMatInputDirective } from '../../directives/custom-mat-input.directive';
import { BaseInputComponent } from '../base-input/base-input.component';
import { MaterialModule } from '../../../../../material/material.module';

@Component({
  selector: 'app-default-input',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CustomMatInputDirective],
  template: `
    <mat-form-field appearance="outline" color="primary" class="input">
      <mat-label>{{ attributes[key].label }}</mat-label>
      <input
        customMatInput
        [type]="attributes[key].type"
        [value]="value"
        [disabled]="disabled"
        [placeholder]="attributes[key].placeholder"
        (input)="onValueChange($event)"
      />
    </mat-form-field>
  `,
  styles: `
    .input {
      min-width: 100%;
      max-width: 100%;
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultInputComponent extends BaseInputComponent {}
