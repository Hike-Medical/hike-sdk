import { describe, expect } from '@jest/globals';
import { extractCompanyId } from '../src/helpers/extractCompanyId';

describe('Company ID Extraction', () => {
  test('Extracts company ID from URL with ID present', () => {
    const url = 'https://example.com/company/123';
    expect(extractCompanyId(url)).toBe('123');
  });

  test('Extracts company ID from URL with ID and trailing slash', () => {
    const url = 'https://example.com/company/abc/';
    expect(extractCompanyId(url)).toBe('abc');
  });

  test('Extracts company ID from URL with ID and additional path', () => {
    const url = 'https://example.com/company/xyz/dashboard';
    expect(extractCompanyId(url)).toBe('xyz');
  });

  test('Returns empty string for URL without company ID', () => {
    const url = 'https://example.com';
    expect(extractCompanyId(url)).toBe('');
  });

  test('Returns empty string for URL with company path but no ID', () => {
    const url = 'https://example.com/company/';
    expect(extractCompanyId(url)).toBe('');
  });

  test('Extracts company ID from URL with company path and query parameters', () => {
    const url = 'https://example.com/company/abc?param1=value1&param2=value2';
    expect(extractCompanyId(url)).toBe('abc');
  });

  test('Returns empty string for URL with company path and hash fragment', () => {
    const url = 'https://example.com/company/abc#section';
    expect(extractCompanyId(url)).toBe('abc');
  });

  test('Extracts company ID from URL with ID containing special characters', () => {
    const url = 'https://example.com/company/abc_123%25';
    expect(extractCompanyId(url)).toBe('abc_123%25');
  });

  test('Extracts company ID from URL with multiple company segments', () => {
    const url = 'https://example.com/company/abc/company/123';
    expect(extractCompanyId(url)).toBe('abc');
  });
});
