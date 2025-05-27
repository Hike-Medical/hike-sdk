import { isDefined } from '@hike/types';
import { describe, expect, test } from '@jest/globals';

describe('isDefined tests', () => {
  test('should filter out null values from an array', () => {
    const mixedArray = [0, 1, null, 3, 'a', null, 'b'];
    const filteredArray = mixedArray.filter(isDefined);
    expect(filteredArray).toEqual([0, 1, 3, 'a', 'b']);
  });

  test('should return an empty array when all values are null', () => {
    const nullArray = [null, null, null];
    const filteredArray = nullArray.filter(isDefined);
    expect(filteredArray).toHaveLength(0);
  });

  test('should return an empty array when values are null or undefined', () => {
    const array = [null, undefined, null];
    const filteredArray = array.filter(isDefined);
    expect(filteredArray).toHaveLength(0);
  });

  test('should return the same array if no values are null', () => {
    const noNullArray = [1, 2, 3, 'a', 'b'];
    const filteredArray = noNullArray.filter(isDefined);
    expect(filteredArray).toEqual(noNullArray);
  });
});
