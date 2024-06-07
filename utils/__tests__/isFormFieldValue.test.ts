import { describe, expect, test } from '@jest/globals';
import { isFormFieldValue } from '../src/guards/isFormFieldValue';

describe('isFormFieldValue tests', () => {
  test('should return true for strings', () => {
    expect(isFormFieldValue('hello')).toBe(true);
  });

  test('should return true for arrays of strings', () => {
    expect(isFormFieldValue(['hello', 'world'])).toBe(true);
  });

  test('should return true for numbers', () => {
    expect(isFormFieldValue(42)).toBe(true);
  });

  test('should return true for arrays of numbers', () => {
    expect(isFormFieldValue([1, 2, 3])).toBe(true);
  });

  test('should return true for booleans', () => {
    expect(isFormFieldValue(true)).toBe(true);
    expect(isFormFieldValue(false)).toBe(true);
  });

  test('should return true for null and undefined', () => {
    expect(isFormFieldValue(null)).toBe(true);
    expect(isFormFieldValue(undefined)).toBe(true);
  });

  test('should return false for objects', () => {
    expect(isFormFieldValue({})).toBe(false);
  });

  test('should return false for arrays of booleans', () => {
    expect(isFormFieldValue([true, false])).toBe(false);
  });
});
