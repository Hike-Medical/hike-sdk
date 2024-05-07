/**
 * Type guard for filtering for only boolean values.
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
