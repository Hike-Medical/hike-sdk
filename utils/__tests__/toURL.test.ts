import { describe, expect, test } from '@jest/globals';
import { toURL } from '../src/converters/toURL';

describe('isValidURL', () => {
  test('should return true for valid URLs', () => {
    expect(toURL('https://www.example.com')).toBeTruthy();
    expect(toURL('http://example.com')).toBeTruthy();
    expect(toURL('http://www.example.co.uk')).toBeTruthy();
    expect(toURL('https://example.org/path')).toBeTruthy();
    expect(toURL('https://example.io')).toBeTruthy();
    expect(toURL('http://example')).toBeTruthy();
    expect(toURL('http://example.any')).toBeTruthy();
    expect(toURL('http://localhost')).toBeTruthy();
    expect(toURL('http://abc')).toBeTruthy();
    expect(toURL(new URL('http://example.com'))).toBeTruthy();
  });

  test('should return false for invalid URLs', () => {
    expect(toURL('www.example.com')).toBeFalsy();
    expect(toURL('example.com')).toBeFalsy();
    expect(toURL('htt:invalid-url')).toBeFalsy();
    expect(toURL('not a valid url')).toBeFalsy();
    expect(toURL('')).toBeFalsy();
    expect(toURL(123)).toBeFalsy();
    expect(toURL(null)).toBeFalsy();
    expect(toURL(undefined)).toBeFalsy();
    expect(toURL({})).toBeFalsy();
    expect(toURL([])).toBeFalsy();
  });
});
