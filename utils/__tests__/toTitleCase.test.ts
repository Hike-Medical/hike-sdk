import { describe, expect, test } from '@jest/globals';
import { toTitleCase } from '../src/converters/toTitleCase';

describe('toTitleCase', () => {
  test('converts a lowercase string to title case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
  });

  test('converts an uppercase string to title case', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
  });

  test('converts a mixed-case string to title case', () => {
    expect(toTitleCase('hElLo WoRlD')).toBe('Hello World');
  });

  test('converts a string with leading/trailing spaces to title case', () => {
    expect(toTitleCase('  hello world  ')).toBe('  Hello World  ');
  });

  test('converts an empty string to an empty string', () => {
    expect(toTitleCase('')).toBe('');
  });
});
