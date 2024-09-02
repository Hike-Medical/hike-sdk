import { isString } from '../guards/isString';

export const isEmpty = (value: unknown) =>
  value == null ||
  (isString(value) && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0);
