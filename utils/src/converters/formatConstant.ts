import { toTitleCase } from './toTitleCase';

/**
 * Returns a constant in title case, in which the constants convention is assumed to be all capitalized letters and underscores.
 */
export const formatConstant = (value: string) => value && toTitleCase(value.replace(/_+/g, ' '));
