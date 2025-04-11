import {
  AfterViewInit,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DefaultInputComponent } from '../components/default-input/default-input.component';
import { PasswordInputComponent } from '../components/password-input/password-input.component';
import { InputConfig } from '../types/input.types';

const inputTypes = {
  defaultInput: 'DEFAULT',
  passwordInput: 'PASSWORD',
} as const;
const { defaultInput, passwordInput } = inputTypes;

const inputContainer = () => ({
  [defaultInput]: DefaultInputComponent,
  [passwordInput]: PasswordInputComponent,
});

export type InputContainer = ReturnType<typeof inputContainer>;
export type InputContainerKey = (typeof inputTypes)[keyof typeof inputTypes];
export type InputContainerValue = InputContainer;
export type InputComponent =
  InputContainerValue[keyof InputContainerValue]['prototype'];

const inputContainerFactory = (
  componentName: InputContainerKey = 'DEFAULT'
): InputContainer[InputContainerKey] => inputContainer()[componentName];

@Directive({
  selector: '[appInputRenderer]',
  standalone: true,
})
export class InputRendererDirective implements AfterViewInit, OnDestroy {
  @Input() componentName: InputContainerKey = 'DEFAULT';
  @Output() blurred = new EventEmitter<FocusEvent>();
  #value?: string;
  #inputConfig?: InputConfig;
  #component?: ComponentRef<InputComponent>;
  #destroy$ = new Subject<void>();

  constructor(private readonly viewContainerRef: ViewContainerRef) {}

  @Input() set value(value: string | undefined) {
    this.#value = value;
    if (!this.#component) {
      return;
    }
    const instance = this.#component?.instance;
    if (instance && this.#component) {
      instance.value = value as typeof instance.value;
    }
  }

  @Input() set inputConfig(value: InputConfig | undefined) {
    this.#inputConfig = value;
    // this.#setInputConfig();
  }

  get inputConfig(): InputConfig | undefined {
    return this.#inputConfig;
  }

  ngAfterViewInit(): void {
    this.createInputComponent();
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  createInputComponent(): void {
    this.viewContainerRef.clear();
    const component = this.viewContainerRef.createComponent<InputComponent>(
      inputContainerFactory(this.resolveComponentName())
    );
    this.#component = component;
    this.setInput();
    this.#initListeners(component);
    component.changeDetectorRef.detectChanges();
  }

  resolveComponentName(): InputContainerKey {
    const type: InputContainerKey | undefined = this.inputConfig?.config?.type;
    if (type) {
      return type;
    }
    return this.componentName ?? defaultInput;
  }

  setInput(): void {
    this.value = this.#value;
  }

  #initListeners(component: ComponentRef<InputComponent>): void {
    this.#listenBlurredEvent(component);
  }

  #listenBlurredEvent(component: ComponentRef<InputComponent>): void {
    component.instance.blurred
      .pipe(takeUntil(this.#destroy$))
      .subscribe((value) => {
        this.blurred.emit(value);
      });
  }

  #setInputConfig(): void {
    const component = this.#component;
    if (!component) {
      return;
    }
    Object.entries(this.inputConfig ?? {}).forEach(([key, value]) => {
      component.setInput(key, value);
    });
  }
}
