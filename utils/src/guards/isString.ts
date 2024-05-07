/**
 * Type guard for filtering for only string values.
 *
 * @example
 * [0, 1, 'hello', 3].filter(isString); // ['hello']
 */
export const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Type guard for filtering for only arrays of string values.
 */
export const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every(isString);
