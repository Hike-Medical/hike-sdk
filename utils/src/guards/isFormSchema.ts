import { FormFieldValue, FormSchema } from '@hike/types';
import { isBoolean } from './isBoolean';
import { isNumber, isNumberArray } from './isNumber';
import { isString, isStringArray } from './isString';

/**
 * Checks if a value is a form schema object.
 */
export const isFormSchema = (value: unknown): value is FormSchema =>
  !!value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  'sections' in value &&
  Array.isArray(value.sections) &&
  value.sections.length > 0 &&
  'fields' in value.sections[0] &&
  Array.isArray(value.sections[0].fields) &&
  value.sections[0].fields.length > 0 &&
  'name' in value.sections[0].fields[0] &&
  typeof value.sections[0].fields[0].name === 'string';

/**
 * Checks if a object is a form field and value mapping.
 */
export const isFormFieldValue = (value: unknown): value is FormFieldValue =>
  isString(value) ||
  isStringArray(value) ||
  isNumber(value) ||
  isNumberArray(value) ||
  isBoolean(value) ||
  value === null ||
  typeof value === 'undefined';

/**
 * Checks if an object is a form field and value mapping.
 */
export const isFormFieldInputs = (inputs: unknown): inputs is Record<string, FormFieldValue> =>
  !!inputs &&
  typeof inputs === 'object' &&
  !Array.isArray(inputs) &&
  Object.keys(inputs).every(isString) &&
  Object.values(inputs).every(isFormFieldValue);
