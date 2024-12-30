/**
 * Validates if the input is a valid email address or phone number.
 */
export const validateEmailOrPhone = (input: string): boolean => validateEmail(input) || validatePhone(input);

/**
 * Validates if the input is a valid email address.
 */
export const validateEmail = (input: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

/**
 * Validates if the input is a valid phone number. Allows spaces, parentheses, and dashes.
 */
export const validatePhone = (input: string): boolean => /^[\s()+-]*([0-9][\s()+-]*){10,15}$/.test(input);
