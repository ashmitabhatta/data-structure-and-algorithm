import { ATTRIBUTES_CONSTANT } from './form-fields.constant';

export const ERROR_MESSAGE_CONSTANT = Object.freeze({
  [ATTRIBUTES_CONSTANT.username.key]: {
    required: 'errorMessage.username.required',
  },
  [ATTRIBUTES_CONSTANT.password.key]: {
    required: 'errorMessage.password.required',
  },
});
