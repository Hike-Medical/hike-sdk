import { describe, expect, test } from '@jest/globals';
import { createQueryString, updatePathQueryString, updateUrlQueryString } from '../src/helpers/queryStringUtils';

describe('updateUrlQueryString', () => {
  test('should update existing query parameters', () => {
    expect(updateUrlQueryString('https://example.com/some/path?abc=123&def=456', { abc: '789', ghi: 'new' })).toBe(
      'https://example.com/some/path?abc=789&def=456&ghi=new'
    );
  });

  test('should add new query parameters', () => {
    expect(updateUrlQueryString('https://example.com/some/path?abc=123', { foo: 'bar', baz: 'qux' })).toBe(
      'https://example.com/some/path?abc=123&foo=bar&baz=qux'
    );
  });

  test('should remove query parameters', () => {
    expect(updateUrlQueryString('https://example.com/some/path?abc=123&def=456', { abc: null, def: 'updated' })).toBe(
      'https://example.com/some/path?def=updated'
    );
  });

  test('should handle URLs without query parameters', () => {
    expect(updateUrlQueryString('https://example.com/some/path', { foo: 'bar', baz: 'qux' })).toBe(
      'https://example.com/some/path?foo=bar&baz=qux'
    );
  });

  test('should return null for invalid URLs', () => {
    expect(updateUrlQueryString('invalid-url', { foo: 'bar' })).toBeNull();
  });
});

describe('updatePathQueryString', () => {
  test('should update existing query parameters in relative path', () => {
    expect(updatePathQueryString('/some/path?abc=123&def=456', { abc: '789', ghi: 'new' })).toBe(
      '/some/path?abc=789&def=456&ghi=new'
    );
  });

  test('should add new query parameters to relative path', () => {
    expect(updatePathQueryString('/some/path?abc=123', { foo: 'bar', baz: 'qux' })).toBe(
      '/some/path?abc=123&foo=bar&baz=qux'
    );
  });

  test('should remove query parameters from relative path', () => {
    expect(updatePathQueryString('/some/path?abc=123&def=456', { abc: null, def: 'updated' })).toBe(
      '/some/path?def=updated'
    );
  });

  test('should handle paths without query parameters', () => {
    expect(updatePathQueryString('/some/path', { foo: 'bar', baz: 'qux' })).toBe('/some/path?foo=bar&baz=qux');
  });

  test('should handle empty paths', () => {
    expect(updatePathQueryString('/', { foo: 'bar', baz: 'qux' })).toBe('/?foo=bar&baz=qux');
  });

  test('should handle special characters in query', () => {
    expect(updatePathQueryString('/some/path?name=John+Doe', { age: '30', location: 'NYC' })).toBe(
      '/some/path?name=John+Doe&age=30&location=NYC'
    );
  });
});

describe('createQueryString', () => {
  test('should update existing parameters', () => {
    const params = new URLSearchParams('abc=123&def=456');
    expect(createQueryString(params, { abc: '789', ghi: 'new' })).toBe('abc=789&def=456&ghi=new');
  });

  test('should add new parameters', () => {
    const params = new URLSearchParams('abc=123&def=456');
    expect(createQueryString(params, { foo: 'bar', baz: 'qux' })).toBe('abc=123&def=456&foo=bar&baz=qux');
  });

  test('should remove parameters', () => {
    const params = new URLSearchParams('abc=123&def=456');
    expect(createQueryString(params, { abc: null, def: 'updated' })).toBe('def=updated');
  });

  test('should handle empty URLSearchParams', () => {
    const params = new URLSearchParams();
    expect(createQueryString(params, { foo: 'bar', baz: 'qux' })).toBe('foo=bar&baz=qux');
  });

  test('should handle special characters in query', () => {
    const params = new URLSearchParams('name=John+Doe');
    expect(createQueryString(params, { age: '30', location: 'NYC' })).toBe('name=John+Doe&age=30&location=NYC');
  });

  test('should handle undefined and null values', () => {
    const params = new URLSearchParams('abc=123');
    expect(createQueryString(params, { foo: undefined, bar: null })).toBe('abc=123');
  });
});
