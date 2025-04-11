import { InputConfig } from './input.types';
import { InputContainerKey } from '../directives/input-renderer.directive';

const TYPE_DEFAULT: InputContainerKey = 'DEFAULT';
const TYPE_PASSWORD: InputContainerKey = 'PASSWORD';

export const defaultConfig: InputConfig = ({
  config: { type: TYPE_DEFAULT },
}) as const;

export const passwordConfig: InputConfig = ({
  config: { type: TYPE_PASSWORD },
}) as const;
