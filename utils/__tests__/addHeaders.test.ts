import { describe, expect, test } from '@jest/globals';
import { addHeaders } from '../src/helpers/addHeaders';

describe('addHeaders', () => {
  test('should return undefined when no headers are provided', () => {
    expect(addHeaders()).toBeUndefined();
  });

  test('should return only x-company-id header when companyIds are provided', () => {
    expect(addHeaders(['123', '456'])).toEqual({ 'x-company-id': '123,456' });
  });

  test('should return only additional headers when no companyIds are provided', () => {
    expect(addHeaders(undefined, { Authorization: 'Bearer abc123' })).toEqual({
      Authorization: 'Bearer abc123'
    });
  });

  test('should return both x-company-id and additional headers when both are provided', () => {
    expect(addHeaders(['789'], { Authorization: 'Bearer abc123' })).toEqual({
      'x-company-id': '789',
      Authorization: 'Bearer abc123'
    });
  });

  test('should filter out undefined additional headers', () => {
    expect(addHeaders(['123'], { Authorization: undefined, 'X-Test': 'TestValue' })).toEqual({
      'x-company-id': '123',
      'X-Test': 'TestValue'
    });
  });

  test('should return undefined when all headers are undefined', () => {
    expect(addHeaders(undefined, { Authorization: undefined, 'X-Test': undefined })).toBeUndefined();
  });

  test('should return undefined when companyIds is an empty array and no other headers are provided', () => {
    expect(addHeaders([], {})).toBeUndefined();
  });

  test('should return only valid headers when mixed values are provided', () => {
    expect(addHeaders(['999'], { Authorization: '', 'X-Valid': 'ValidValue' })).toEqual({
      'x-company-id': '999',
      'X-Valid': 'ValidValue'
    });
  });

  test('should handle Content-Type: multipart/form-data correctly', () => {
    expect(addHeaders(['555'], { 'Content-Type': 'multipart/form-data' })).toEqual({
      'x-company-id': '555',
      'Content-Type': 'multipart/form-data'
    });
  });

  test('should return correct headers when multiple valid headers including Content-Type are provided', () => {
    expect(
      addHeaders(['333'], {
        Authorization: 'Bearer secret-token',
        'Content-Type': 'multipart/form-data'
      })
    ).toEqual({
      'x-company-id': '333',
      Authorization: 'Bearer secret-token',
      'Content-Type': 'multipart/form-data'
    });
  });

  test('should remove undefined headers but keep valid Content-Type', () => {
    expect(
      addHeaders(['222'], {
        Authorization: undefined,
        'Content-Type': 'multipart/form-data'
      })
    ).toEqual({
      'x-company-id': '222',
      'Content-Type': 'multipart/form-data'
    });
  });

  test('should return undefined if companyIds is empty and additional headers are all undefined', () => {
    expect(
      addHeaders([], {
        Authorization: undefined,
        'Content-Type': undefined
      })
    ).toBeUndefined();
  });
});
