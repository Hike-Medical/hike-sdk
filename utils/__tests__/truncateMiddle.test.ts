import { describe, expect, test } from '@jest/globals';
import { truncateMiddle } from '../src/helpers/truncateMiddle';

describe('truncateMiddle tests', () => {
  test('should return an empty string for null or undefined input', () => {
    expect(truncateMiddle(null, 10)).toBe('');
    expect(truncateMiddle(undefined, 10)).toBe('');
  });

  test('should return the original string if its length is less than or equal to the desired length', () => {
    const input = 'Hello, world!';
    expect(truncateMiddle(input, 20)).toBe(input);
  });

  test('should truncate the string and add ellipses in the middle with trim', () => {
    const input = 'This is a long text that needs to be truncated.';
    const expectedOutput = 'This is a...truncated.';
    expect(truncateMiddle(input, 10)).toBe(expectedOutput);
  });

  test('should return the original string if its length is less than or equal to the desired length', () => {
    const input = 'Hello, world!';
    const expectedOutput = 'Hel...ld!';
    expect(truncateMiddle(input, 3)).toBe(expectedOutput);
  });

  test('should return value if length is exactly the length required to truncate on each side', () => {
    const input = '12345678';
    expect(truncateMiddle(input, 4)).toBe('12345678');
  });

  test('should return value if length is odd length', () => {
    const input = '123456789';
    expect(truncateMiddle(input, 4)).toBe('1234...6789');
  });
});
