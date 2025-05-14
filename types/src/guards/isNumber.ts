/**
 * Type guard for filtering for only number values.
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number';

/**
 * Type guard for filtering for only arrays of number values.
 */
export const isNumberArray = (value: unknown): value is number[] => Array.isArray(value) && value.every(isNumber);
