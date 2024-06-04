import { findKeyInNested } from '../src/helpers/findKeyInNested';

describe('findKeyInNested', () => {
  test('should find a key in a shallow object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(findKeyInNested(obj, 'b')).toBe(2);
  });

  test('should find a key in a nested object', () => {
    const obj = { a: 1, b: { c: 3, d: { e: 5 } } };
    expect(findKeyInNested(obj, 'e')).toBe(5);
  });

  test('should find a key in an array of objects', () => {
    const obj = [{ a: 1 }, { b: { c: 3 } }, { d: 4 }];
    expect(findKeyInNested(obj, 'c')).toBe(3);
  });

  test('should return undefined if key is not found', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(findKeyInNested(obj, 'd')).toBeUndefined();
  });

  test('should handle arrays within nested objects', () => {
    const obj = { a: [1, 2, { b: 3 }] };
    expect(findKeyInNested(obj, 'b')).toBe(3);
  });

  test('should handle complex nested structures', () => {
    const obj = {
      a: [{ b: { c: 3 } }, { d: 4 }, { e: { f: { g: 7, h: { i: 9 } } } }],
      j: 10
    };
    expect(findKeyInNested(obj, 'i')).toBe(9);
  });

  test('should find a key in an array of arrays', () => {
    const obj = [
      [{ a: 1 }, { b: 2 }],
      [{ c: 3 }, { d: 4 }]
    ];
    expect(findKeyInNested(obj, 'c')).toBe(3);
  });

  test('should handle null and non-object values correctly', () => {
    const obj = { a: 1, b: null, c: { d: 4 } };
    expect(findKeyInNested(obj, 'd')).toBe(4);
  });
});
