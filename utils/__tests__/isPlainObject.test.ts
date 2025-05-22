import { isPlainObject } from '@hike/types';

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ key: 'value' })).toBe(true);
    expect(isPlainObject({ nested: { a: 1 } })).toBe(true);
  });

  it('should return false for arrays', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(new Array(10))).toBe(false);
  });

  it('should return false for null and undefined', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });

  it('should return false for primitive values', () => {
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(Symbol('test'))).toBe(false);
    expect(isPlainObject(BigInt(123))).toBe(false);
  });

  it('should return false for built-in objects', () => {
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new RegExp('test'))).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new WeakMap())).toBe(false);
    expect(isPlainObject(new WeakSet())).toBe(false);
    expect(isPlainObject(new Promise(() => {}))).toBe(false);
  });

  it('should return false for functions and class instances', () => {
    class TestClass {}
    function testFunction() {}

    expect(isPlainObject(testFunction)).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(new TestClass())).toBe(false);
  });

  it('should return true for objects created with Object.create(null)', () => {
    const obj = Object.create(null);
    obj.key = 'value';
    expect(isPlainObject(obj)).toBe(true);
  });

  it('should return false for objects with custom prototypes', () => {
    class CustomObject {
      prop = 'value';
    }

    expect(isPlainObject(new CustomObject())).toBe(false);
    expect(isPlainObject(Object.create({}))).toBe(false); // Object with prototype chain
  });
});
