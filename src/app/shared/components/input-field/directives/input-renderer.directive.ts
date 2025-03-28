import {
  AfterViewInit,
  ComponentRef,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { DefaultInputComponent } from '../components/default-input/default-input.component';

const inputTypes = {
  defaultInput: 'DEFAULT',
} as const;
const { defaultInput } = inputTypes;

const inputContainer = () => ({
  [defaultInput]: DefaultInputComponent,
});

type InputContainer = ReturnType<typeof inputContainer>;
type InputContainerKey = (typeof inputTypes)[keyof typeof inputTypes];
type InputContainerValue = InputContainer;
type InputComponent =
  InputContainerValue[keyof InputContainerValue]['prototype'];

const inputContainerFactory = (
  componentName: InputContainerKey = 'DEFAULT'
): InputContainer[InputContainerKey] => inputContainer()[componentName];

@Directive({
  selector: '[appInputRenderer]',
  standalone: true,
})
export class InputRendererDirective implements AfterViewInit {
  @Input() componentName: InputContainerKey = 'DEFAULT';
  #value?: string;
  #component?: ComponentRef<InputComponent>;

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

  ngAfterViewInit(): void {
    this.createInputComponent();
  }

  createInputComponent(): void {
    this.viewContainerRef.clear();
    const component = this.viewContainerRef.createComponent<InputComponent>(
      inputContainerFactory(this.resolveComponentName())
    );
    this.#component = component;
    this.setInput();
    component.changeDetectorRef.detectChanges();
  }

  resolveComponentName(): InputContainerKey {
    return this.componentName ?? defaultInput;
  }

  setInput(): void {
    this.value = this.#value;
  }
}
