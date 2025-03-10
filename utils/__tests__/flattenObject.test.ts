import { FormFieldValue } from '@hike/types';
import { flattenObject } from '../src/converters/flattenObject';

describe('flattenObject', () => {
  // ✅ Basic Cases
  it('should handle an empty object', () => {
    expect(flattenObject({})).toEqual({});
  });

  it('should handle simple key-value pairs', () => {
    const input = { name: 'John', age: 30 };
    expect(flattenObject(input)).toEqual(input);
  });

  // ✅ Nested Objects
  it('should flatten a nested object', () => {
    const input = { user: { name: 'John', details: { age: 30 } } };
    const expected = { 'user.name': 'John', 'user.details.age': 30 };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle deeply nested structures', () => {
    const input = { a: { b: { c: { d: { e: 1 } } } } };
    const expected = { 'a.b.c.d.e': 1 };
    expect(flattenObject(input)).toEqual(expected);
  });

  // ✅ Arrays
  it('should flatten an object with arrays', () => {
    const input: Record<string, FormFieldValue> = { hobbies: ['reading', 'coding'] };
    const expected = { 'hobbies.0': 'reading', 'hobbies.1': 'coding' };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle objects within arrays', () => {
    const input = { users: [{ name: 'Alice' }, { name: 'Bob' }] };
    const expected = { 'users.0.name': 'Alice', 'users.1.name': 'Bob' };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should flatten an object where FormFieldValue contains arrays of numbers', () => {
    const input: Record<string, FormFieldValue> = { numbers: [10, 20, 30] };
    const expected = { 'numbers.0': 10, 'numbers.1': 20, 'numbers.2': 30 };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle arrays with mixed types', () => {
    const input = { mixed: [true, 'text', 42, null, undefined] };
    const expected = {
      'mixed.0': true,
      'mixed.1': 'text',
      'mixed.2': 42,
      'mixed.3': null,
      'mixed.4': undefined
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  // ✅ Mixed & Edge Cases
  it('should handle null and undefined values', () => {
    const input = { name: null, age: undefined };
    expect(flattenObject(input)).toEqual(input);
  });

  it('should handle FormFieldValue compatibility', () => {
    const input: Record<string, FormFieldValue> = {
      text: 'string',
      numbers: [1, 2, 3],
      flag: true,
      empty: null,
      missing: undefined,
      single: 42
    };
    const expected = {
      text: 'string',
      'numbers.0': 1,
      'numbers.1': 2,
      'numbers.2': 3,
      flag: true,
      empty: null,
      missing: undefined,
      single: 42
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it('should handle complex nested structures', () => {
    const input = {
      user: {
        profile: {
          name: 'John',
          addresses: [
            { city: 'New York', zip: 10001 },
            { city: 'Boston', zip: '02108' }
          ]
        },
        settings: {
          notifications: { email: true, sms: false }
        }
      }
    };

    const expected = {
      'user.profile.name': 'John',
      'user.profile.addresses.0.city': 'New York',
      'user.profile.addresses.0.zip': 10001,
      'user.profile.addresses.1.city': 'Boston',
      'user.profile.addresses.1.zip': '02108',
      'user.settings.notifications.email': true,
      'user.settings.notifications.sms': false
    };

    expect(flattenObject(input)).toEqual(expected);
  });

  // ✅ Special Object Types
  it('should correctly flatten objects containing special types', () => {
    const input = {
      date: new Date('2023-01-01'),
      regex: /test/,
      fn: (x: number) => x * 2,
      symbol: Symbol('test'),
      bigint: BigInt(123),
      complex: {
        map: new Map([['key', 'value']]),
        set: new Set([1, 2, 3])
      }
    };

    const result = flattenObject(input);

    expect(result.date).toBeInstanceOf(Date);
    expect(result.regex).toBeInstanceOf(RegExp);
    expect(typeof result.fn).toBe('function');
    expect(typeof result.symbol).toBe('symbol');
    expect(typeof result.bigint).toBe('bigint');
    expect(result['complex.map']).toBeInstanceOf(Map);
    expect(result['complex.set']).toBeInstanceOf(Set);
  });
});
