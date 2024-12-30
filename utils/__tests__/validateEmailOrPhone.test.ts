import { describe, expect, test } from '@jest/globals';
import { validateEmailOrPhone } from '../src/helpers/validateEmailOrPhone';

describe('validateEmailOrPhone', () => {
  test('should validate emails correctly', () => {
    expect(validateEmailOrPhone('test@example.com')).toBeTruthy();
  });

  test('should validate phone numbers correctly with various formats', () => {
    expect(validateEmailOrPhone('+1234567890')).toBeTruthy();
    expect(validateEmailOrPhone('+601234567890')).toBeTruthy();
    expect(validateEmailOrPhone('(123) 456-7890')).toBeTruthy();
    expect(validateEmailOrPhone('123-456-7890')).toBeTruthy();
    expect(validateEmailOrPhone('123 456 7890')).toBeTruthy();
  });

  test('should invalidate incorrect inputs', () => {
    expect(validateEmailOrPhone('invalid-input')).toBeFalsy();
    expect(validateEmailOrPhone('123')).toBeFalsy();
  });

  test('should handle edge cases', () => {
    expect(validateEmailOrPhone('')).toBeFalsy();
    expect(validateEmailOrPhone('   ')).toBeFalsy();
  });
});
