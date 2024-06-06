import { FormFieldValue } from '@hike/types';
import { isBoolean } from './isBoolean';
import { isNumber, isNumberArray } from './isNumber';
import { isString, isStringArray } from './isString';

/**
 * Type guard for filtering for only `FormFieldValue` types.
 *
 * @example
 * const values: unknown[] = ['string', [1, 2], 42, [true], null, undefined];
 * const filteredValues = values.filter(isFormFieldValue);
 * // ['string', [1, 2], 42, null, undefined]
 *
 */
export const isFormFieldValue = (value: unknown): value is FormFieldValue =>
  isString(value) ||
  isStringArray(value) ||
  isNumber(value) ||
  isNumberArray(value) ||
  isBoolean(value) ||
  value === null ||
  value === undefined;
