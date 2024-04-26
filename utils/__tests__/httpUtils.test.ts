import { describe, expect, test } from '@jest/globals';

import { getHost, getHostUrl, getProtocol, getValue, isHttps } from '../src/helpers/httpUtils';

describe('httpUtils tests', () => {
  describe('getValue', () => {
    test('retrieves value from Headers instance', () => {
      const headers = new Headers();
      headers.append('content-type', 'application/json');
      expect(getValue(headers, 'content-type')).toBe('application/json');
    });

    test('retrieves value from record object', () => {
      const headers = { 'content-type': 'application/json' };
      expect(getValue(headers, 'content-type')).toBe('application/json');
    });

    test('returns null if the key does not exist', () => {
      const headers = new Headers();
      expect(getValue(headers, 'authorization')).toBeNull();
    });
    test('handles case-insensitivity in Headers instance', () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      expect(getValue(headers, 'content-type')).toBe('application/json');
      expect(getValue(headers, 'CONTENT-TYPE')).toBe('application/json');
      expect(getValue(headers, 'Content-Type')).toBe('application/json');
    });

    test('handles case-insensitivity in record object', () => {
      const headers = { 'Content-Type': 'application/json' };
      expect(getValue(headers, 'content-type')).toBe('application/json');
      expect(getValue(headers, 'CONTENT-TYPE')).toBe('application/json');
      expect(getValue(headers, 'Content-Type')).toBe('application/json');
    });

    test('returns correct values for mixed-case header keys in record object', () => {
      const headers = { 'content-TYPE': 'application/json' };
      expect(getValue(headers, 'CONTENT-type')).toBe('application/json');
    });

    test('retrieves first value of array if header value is an array', () => {
      const headers = { 'Accept-Encoding': ['gzip', 'deflate'] };
      expect(getValue(headers, 'accept-encoding')).toBe('gzip');
    });

    test('returns null if the key does not exist regardless of casing', () => {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      expect(getValue(headers, 'accept-ENCODING')).toBeNull();
    });

    test('handles empty and undefined values in record object correctly', () => {
      const headers = { 'X-Custom-Header': '', 'Another-Header': undefined };
      expect(getValue(headers, 'x-custom-header')).toBeNull();
      expect(getValue(headers, 'another-header')).toBeNull();
    });
  });

  describe('getHost', () => {
    test('retrieves host from x-forwarded-host', () => {
      const headers = { 'x-forwarded-host': 'example.com' };
      expect(getHost(headers)).toBe('example.com');
    });

    test('falls back to host if x-forwarded-host is absent', () => {
      const headers = { host: 'example.com' };
      expect(getHost(headers)).toBe('example.com');
    });

    test('returns null if no host header is present', () => {
      const headers = {};
      expect(getHost(headers)).toBeNull();
    });

    test('prioritizes x-forwarded-host over host when both are present', () => {
      const headers = {
        'x-forwarded-host': 'proxy.example.com',
        host: 'origin.example.com'
      };
      expect(getHost(headers)).toBe('proxy.example.com');
    });

    test('handles multiple entries in x-forwarded-host and uses the first one', () => {
      const headers = {
        'x-forwarded-host': 'first.example.com,second.example.com',
        host: 'origin.example.com'
      };
      expect(getHost(headers)).toBe('first.example.com');
    });

    test('returns host when x-forwarded-host is present but empty', () => {
      const headers = {
        'x-forwarded-host': '',
        host: 'origin.example.com'
      };
      expect(getHost(headers)).toBe('origin.example.com');
    });

    test('returns null if both x-forwarded-host and host are absent', () => {
      const headers = {};
      expect(getHost(headers)).toBeNull();
    });

    test('returns null if both x-forwarded-host and host are empty', () => {
      const headers = {
        'x-forwarded-host': '',
        host: ''
      };
      expect(getHost(headers)).toBeNull();
    });
  });

  describe('getProtocol', () => {
    test('correctly identifies https from x-forwarded-proto', () => {
      const headers = { 'x-forwarded-proto': 'https' };
      expect(getProtocol(headers)).toBe('https');
    });

    test('defaults to https for remote hosts', () => {
      const headers = { host: 'example.com' };
      expect(getProtocol(headers)).toBe('https');
    });

    test('defaults to http for local hosts', () => {
      const headers = { host: 'localhost' };
      expect(getProtocol(headers)).toBe('http');
    });

    test('defaults to http for recognized local host patterns', () => {
      let headers = { host: 'localhost' };
      expect(getProtocol(headers)).toBe('http');

      headers = { host: '127.0.0.1' };
      expect(getProtocol(headers)).toBe('http');

      headers = { host: '192.168.1.1' };
      expect(getProtocol(headers)).toBe('http');

      headers = { host: '10.0.0.1' };
      expect(getProtocol(headers)).toBe('http');

      headers = { host: 'mydevice.local' };
      expect(getProtocol(headers)).toBe('http');
    });

    test('defaults to https for unrecognizable or remote host patterns', () => {
      let headers = { host: 'example.com' };
      expect(getProtocol(headers)).toBe('https');

      headers = { host: 'sub.example.com' };
      expect(getProtocol(headers)).toBe('https');

      headers = { host: '254.254.254.254' };
      expect(getProtocol(headers)).toBe('https');
    });
  });

  describe('isHttps', () => {
    test('returns true for https protocol', () => {
      const headers = { 'x-forwarded-proto': 'https' };
      expect(isHttps(headers)).toBeTruthy();
    });

    test('returns false for http protocol', () => {
      const headers = { 'x-forwarded-proto': 'http' };
      expect(isHttps(headers)).toBeFalsy();
    });
  });

  describe('getHostUrl', () => {
    test('constructs full URL with protocol and host', () => {
      const headers = { 'x-forwarded-proto': 'https', host: 'example.com' };
      expect(getHostUrl(headers)).toBe('https://example.com');
    });

    test('returns null if host is absent', () => {
      const headers = { 'x-forwarded-proto': 'https' };
      expect(getHostUrl(headers)).toBeNull();
    });
  });
});
