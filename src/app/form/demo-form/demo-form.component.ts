import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ATTRIBUTES_CONSTANT } from '../../shared/constants/form-fields.constant';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { MaterialModule } from '../../material/material.module';

const { username, password } = ATTRIBUTES_CONSTANT;

@Component({
  selector: 'app-demo-form',
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    InputFieldComponent,
  ],
  templateUrl: './demo-form.component.html',
  styleUrl: './demo-form.component.scss',
})
export class DemoFormComponent implements OnInit {
  protected readonly attributes = ATTRIBUTES_CONSTANT;

  form?: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      [username.key]: ['', [Validators.required]],
      [password.key]: ['', [Validators.required]],
    });
  }

  submit(): void {
    console.log(this.form);
  }
}
