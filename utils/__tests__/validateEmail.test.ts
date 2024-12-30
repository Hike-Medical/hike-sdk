import { describe, expect, test } from '@jest/globals';
import { validateEmail } from '../src/helpers/validateEmail';

describe('validateEmailOrPhone', () => {
  test('should validate emails correctly', () => {
    expect(validateEmail('test@example.com')).toBeTruthy();
  });

  test('should invalidate incorrect inputs', () => {
    expect(validateEmail('invalid-input')).toBeFalsy();
    expect(validateEmail('123')).toBeFalsy();
  });

  test('should handle edge cases', () => {
    expect(validateEmail('')).toBeFalsy();
    expect(validateEmail('   ')).toBeFalsy();
  });
});
