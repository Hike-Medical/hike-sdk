import {
  FormFieldValue,
  FormSubmissionTyped,
  isBoolean,
  isNumber,
  isNumberArray,
  isString,
  isStringArray
} from '@hike/types';

/**
 * Returns the first form value from the submissions that matches the key and is valid.
 */
export const getFormValue = <T extends FormFieldValue>(
  submissions: { data?: FormSubmissionTyped['data'] }[] | undefined,
  key: string,
  isValid: (value: FormFieldValue) => value is T
): T | undefined => (submissions ?? []).map((submission) => submission.data?.[key]).find(isValid);

/**
 * Returns the first string form value from the submissions that matches the key.
 */
export const getStringFormValue = (
  submissions: { data?: FormSubmissionTyped['data'] }[] | undefined,
  key: string
): string | undefined => getFormValue(submissions, key, isString);

/**
 * Returns the first string array form value from the submissions that matches the key.
 */
export const getStringArrayFormValue = (
  submissions: { data?: FormSubmissionTyped['data'] }[] | undefined,
  key: string
): string[] | undefined => getFormValue(submissions, key, isStringArray);

/**
 * Returns the first number form value from the submissions that matches the key.
 */
export const getNumberFormValue = (
  submissions: { data?: FormSubmissionTyped['data'] }[] | undefined,
  key: string
): number | undefined => getFormValue(submissions, key, isNumber);

/**
 * Returns the first number array form value from the submissions that matches the key.
 */
export const getNumberArrayFormValue = (
  submissions: { data?: FormSubmissionTyped['data'] }[] | undefined,
  key: string
): number[] | undefined => getFormValue(submissions, key, isNumberArray);

/**
 * Returns the first boolean form value from the submissions that matches the key.
 */
export const getBooleanFormValue = (
  submissions: { data?: FormSubmissionTyped['data'] }[] | undefined,
  key: string
): boolean | undefined => getFormValue(submissions, key, isBoolean);
