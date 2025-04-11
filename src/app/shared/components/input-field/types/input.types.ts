import { InputContainerKey } from '../directives/input-renderer.directive';

export interface InputConfig {
  config: InputFieldConfig;
}

export interface InputFieldConfig {
  type: InputContainerKey;
  componentName?: InputContainerKey;
}
