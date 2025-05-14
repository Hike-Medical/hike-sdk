/**
 * Type guard for filtering out falsy values.
 *
 * @example
 * ['a', 'b', null, '', 'c'].filter(isNotNull); // ['a', 'b', 'c']
 */
export const isTruthy = <T>(value: T | null): value is T => !!value;
