/**
 * Checks if a value is a plain object (not an array, Date, RegExp, etc.)
 */
export const isPlainObject = (value: unknown): boolean =>
  typeof value === 'object' &&
  value !== null &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
