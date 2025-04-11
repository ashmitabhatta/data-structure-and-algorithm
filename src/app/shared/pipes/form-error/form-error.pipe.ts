import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ERROR_MESSAGE_CONSTANT } from '@sharedConstants/error-message.constant';
import { AttributeKeys } from '@sharedConstants/form-fields.constant';

type FormErrorType = { [key: string]: string | boolean };
type ErrorMessageType = (typeof ERROR_MESSAGE_CONSTANT)[AttributeKeys];
type ErrorMessageTypeKey = keyof ErrorMessageType;

interface ErrorMessageRule {
  errorMessage: ErrorMessageType;
  priorityErrorKeys?: string[];
}

@Pipe({
  name: 'formError',
  standalone: true,
})
export class FormErrorPipe implements PipeTransform {
  transform(
    formControlErrors: ValidationErrors | null,
    errorMessageRule: ErrorMessageRule
  ): string | null {
    if (!errorMessageRule.errorMessage || !formControlErrors) {
      return null;
    }
    const errorKeys = this.#getErrorKeys(formControlErrors);
    return this.#getErrorMessage(errorKeys, errorMessageRule);
  }

  #getErrorMessage(errorKeys: string[], rule: ErrorMessageRule): string | null {
    if (rule.priorityErrorKeys?.length) {
      const priorityMessage = this.#findMatchingErrorMessage(
        rule.priorityErrorKeys,
        errorKeys,
        rule.errorMessage
      );
      if (priorityMessage) {
        return priorityMessage;
      }
    }
    return this.#findMatchingErrorMessage(
      this.#getErrorKeys(rule.errorMessage as FormErrorType),
      errorKeys,
      rule.errorMessage
    );
  }

  #findMatchingErrorMessage(
    availableErrorKeys: string[],
    formErrorKeys: string[],
    errorMessages: ErrorMessageType
  ): string | null {
    const matchingKey = availableErrorKeys.find(
      (key) =>
        formErrorKeys.includes(key) && errorMessages[key as ErrorMessageTypeKey]
    );
    return matchingKey
      ? errorMessages[matchingKey as ErrorMessageTypeKey]
      : null;
  }

  #getErrorKeys(errors: Record<string, unknown>): string[] {
    return Object.keys(errors);
  }
}
