/**
 * Validates if the input is a valid phone number. Allows spaces, parentheses, and dashes.
 */
export const validatePhone = (input: string): boolean => /^[\s()+-]*([0-9][\s()+-]*){10,15}$/.test(input);
