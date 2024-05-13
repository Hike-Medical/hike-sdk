import { describe, expect } from '@jest/globals';
import { toBoolean } from '../src/converters/toBoolean';

describe('toBoolean', () => {
  test('should convert boolean values correctly', () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean(false)).toBe(false);
  });

  test('should convert string values correctly', () => {
    expect(toBoolean('true')).toBe(true);
    expect(toBoolean('false')).toBe(false);
    expect(toBoolean('')).toBe(false);
    expect(toBoolean('random')).toBe(false);
  });

  test('should convert number values correctly', () => {
    expect(toBoolean(1)).toBe(true);
    expect(toBoolean(0)).toBe(false);
    expect(toBoolean(-1)).toBe(true);
    expect(toBoolean(42)).toBe(true);
  });

  test('should convert object values correctly', () => {
    expect(toBoolean({})).toBe(false);
    expect(toBoolean({ key: 'value' })).toBe(true);
    expect(toBoolean({ foo: null })).toBe(true);
    expect(toBoolean([])).toBe(false);
    expect(toBoolean([1, 2, 3])).toBe(true);
  });

  test('should convert null undefined', () => {
    expect(toBoolean(null)).toBe(false);
    expect(toBoolean(undefined)).toBe(false);
  });
});
