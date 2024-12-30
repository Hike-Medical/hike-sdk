import { describe, expect, test } from '@jest/globals';
import { validatePhone } from '../src/helpers/validatePhone';

describe('validatePhone', () => {
  test('should validate phone numbers correctly with various formats', () => {
    expect(validatePhone('+1234567890')).toBeTruthy();
    expect(validatePhone('+601234567890')).toBeTruthy();
    expect(validatePhone('(123) 456-7890')).toBeTruthy();
    expect(validatePhone('123-456-7890')).toBeTruthy();
    expect(validatePhone('123 456 7890')).toBeTruthy();
  });

  test('should invalidate incorrect inputs', () => {
    expect(validatePhone('invalid-input')).toBeFalsy();
    expect(validatePhone('123')).toBeFalsy();
  });

  test('should handle edge cases', () => {
    expect(validatePhone('')).toBeFalsy();
    expect(validatePhone('   ')).toBeFalsy();
  });
});
