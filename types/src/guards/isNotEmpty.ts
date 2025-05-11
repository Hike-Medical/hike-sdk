import { isEmpty } from './isEmpty';

/**
 * Type guard for filtering out empty values.
 *
 * @example
 * ['a', '', null, '   ', 'z'].filter(isNotEmpty); // ['a', 'z']
 */
export const isNotEmpty = <T>(value: T | null): value is T => !isEmpty(value);
