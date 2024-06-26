import { describe, expect, test } from '@jest/globals';
import { extractDomain } from '../src/helpers/extractDomain';

describe('extractDomain', () => {
  test('should handle regular domains', () => {
    expect(extractDomain('https://example.com')).toBe('example.com');
  });

  test('should handle single subdomains', () => {
    expect(extractDomain('https://sub.example.com')).toBe('example.com');
  });

  test('should handle multiple subdomains', () => {
    expect(extractDomain('https://sub1.sub2.example.com')).toBe('example.com');
    expect(extractDomain('https://deep.sub.domain.co.uk')).toBe('domain.co.uk');
    expect(extractDomain('https://a.b.c.d.e.f.g.example.net')).toBe('example.net');
  });

  test('should handle special TLDs like co.uk', () => {
    expect(extractDomain('https://domain.co.uk')).toBe('domain.co.uk');
    expect(extractDomain('https://sub.domain.co.uk')).toBe('domain.co.uk');
    expect(extractDomain('https://another.domain.com.au')).toBe('domain.com.au');
  });

  test('should handle localhost', () => {
    expect(extractDomain('http://localhost:3000')).toBe('localhost');
    expect(extractDomain('http://localhost')).toBe('localhost');
  });

  test('should handle non-HTTP/HTTPS protocols', () => {
    expect(extractDomain('ftp://files.example.com')).toBe('example.com');
    expect(extractDomain('ws://websocket.example.com')).toBe('example.com');
  });

  test('should handle non-string values', () => {
    expect(extractDomain(12345)).toBeNull();
    expect(extractDomain({})).toBeNull();
    expect(extractDomain(['https://example.com'])).toBeNull();
    expect(extractDomain(true)).toBeNull();
  });

  test('should handle URL instances', () => {
    expect(extractDomain(new URL('https://test.example.com'))).toBe('example.com');
    expect(extractDomain(new URL('https://deeply.nested.subdomain.example.org'))).toBe('example.org');
  });

  test('should handle invalid URLs gracefully', () => {
    expect(extractDomain('not-a-url')).toBeNull();
    expect(extractDomain('htt:invalid-url')).toBeNull();
    expect(extractDomain('example')).toBeNull();
    expect(extractDomain('http://')).toBeNull();
  });

  test('should handle tricky but valid URLs', () => {
    expect(extractDomain('https://example.com#hash')).toBe('example.com');
    expect(extractDomain('https://example.com/path')).toBe('example.com');
    expect(extractDomain('https://example.com/path?query=string')).toBe('example.com');
  });
});
