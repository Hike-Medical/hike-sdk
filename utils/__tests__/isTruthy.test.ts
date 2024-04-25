import { describe, expect, test } from '@jest/globals';
import { isTruthy } from '../src/guards/isTruthy';

describe('isTruthy tests', () => {
  test('should filter out all falsy values from an array', () => {
    const mixedArray = ['a', 'b', null, '', 'c', 0, false, 'd', undefined];
    const filteredArray = mixedArray.filter(isTruthy);
    expect(filteredArray).toEqual(['a', 'b', 'c', 'd']);
  });

  test('should return an empty array when all values are falsy', () => {
    const falsyArray = [null, '', 0, false, undefined];
    const filteredArray = falsyArray.filter(isTruthy);
    expect(filteredArray).toHaveLength(0);
  });

  test('should return the same array if no values are falsy', () => {
    const truthyArray = [1, 'a', '1', {}, []];
    const filteredArray = truthyArray.filter(isTruthy);
    expect(filteredArray).toEqual(truthyArray);
  });
});
