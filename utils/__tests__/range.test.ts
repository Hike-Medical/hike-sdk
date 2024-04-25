import { describe, expect, test } from '@jest/globals';
import { range } from '../src/helpers/range';

describe('range tests', () => {
  test('should generate a range of numbers between two values, inclusive', () => {
    const start = 30;
    const end = 35;
    const result = Array.from(range(start, end));
    expect(result).toEqual([30, 31, 32, 33, 34, 35]);
  });

  test('should handle a range where start equals end', () => {
    const start = 30;
    const end = 30;
    const result = Array.from(range(start, end));
    expect(result).toEqual([30]);
  });

  test('should return an empty array if the end is less than the start', () => {
    const start = 35;
    const end = 30;
    const result = Array.from(range(start, end));
    expect(result).toEqual([]);
  });
});
