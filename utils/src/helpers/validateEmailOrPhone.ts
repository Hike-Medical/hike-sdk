/**
 * Validates if the input is a valid email address or phone number.
 */
export const validateEmailOrPhone = (input: string): boolean => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
    return true;
  }

  // Allows spaces, parentheses, and dashes
  if (/^[\s()+-]*([0-9][\s()+-]*){10,15}$/.test(input)) {
    return true;
  }

  return false;
};
