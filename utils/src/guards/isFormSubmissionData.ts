import { FormSubmissionTyped } from '@hike/types';
import { isFormFieldValue } from './isFormFieldValue';

/**
 * Type guard for determining if the value is a record of `FormFieldValue`.
 *
 * @example
 * const data: unknown = { field1: 'value', field2: [1, 2] };
 * isFormSubmissionData(data) // true
 *
 */
export const isFormSubmissionData = (value: unknown): value is FormSubmissionTyped['data'] =>
  typeof value === 'object' &&
  value != null &&
  Object.values(value).every(isFormFieldValue) &&
  Object.keys(value).length > 0;
