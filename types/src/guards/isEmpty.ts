import { isString } from './isString';

export const isEmpty = (value: unknown) =>
  value == null ||
  (isString(value) && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length === 0);
