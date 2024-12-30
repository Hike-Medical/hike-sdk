/**
 * Validates if the input is a valid email address.
 */
export const validateEmail = (input: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
