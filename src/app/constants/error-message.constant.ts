import { ATTRIBUTES_CONSTANT } from './form-fields.constant';

export const ERROR_MESSAGE_CONSTANT = Object.freeze({
  [ATTRIBUTES_CONSTANT.username.key]: {
    required: 'errorMessage.username.required',
  },
  [ATTRIBUTES_CONSTANT.password.key]: {
    required: 'errorMessage.password.required',
  },
  [ATTRIBUTES_CONSTANT.email.key]: {
    required: 'errorMessage.email.required',
  },
  [ATTRIBUTES_CONSTANT.mobile.key]: {
    required: 'errorMessage.mobile.required',
  },
  [ATTRIBUTES_CONSTANT.oldPassword.key]: {
    required: 'errorMessage.oldPassword.required',
  },
  [ATTRIBUTES_CONSTANT.newPassword.key]: {
    required: 'errorMessage.newPassword.required',
  },
  [ATTRIBUTES_CONSTANT.confirmPassword.key]: {
    required: 'errorMessage.confirmPassword.required',
  },
});
