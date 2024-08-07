import { AuthUser, FacilityUser } from '@hike/types';
import { describe, expect, test } from '@jest/globals';
import { isAuthUser } from '../src/guards/isAuthUser';

describe('isAuthUser tests', () => {
  test('should return true for a valid AuthUser object', () => {
    const validAuthUser: AuthUser = {
      id: '123',
      companies: {
        company1: 'ADMIN',
        company2: 'PATIENT'
      },
      slugs: {
        company1: 'slug1',
        company2: 'slug2'
      },
      facilities: {
        facility1: 'USER' as FacilityUser // Ensure this matches the expected type
      },

      expiresAt: new Date()
    };

    expect(isAuthUser(validAuthUser)).toBe(true);
  });

  test('should return false for null', () => {
    expect(isAuthUser(null)).toBe(false);
  });

  test('should return false for undefined', () => {
    expect(isAuthUser(undefined)).toBe(false);
  });

  test('should return false for a non-object value', () => {
    expect(isAuthUser('string')).toBe(false);
    expect(isAuthUser(123)).toBe(false);
    expect(isAuthUser(true)).toBe(false);
  });

  test('should return false if the company is empty', () => {
    const emptyCompanies = { id: 'abc', companies: {} };
    expect(isAuthUser(emptyCompanies)).toBe(false);
  });

  test('should return false if the id property is missing', () => {
    const invalidObject = { companies: {} };
    expect(isAuthUser(invalidObject)).toBe(false);
  });

  test('should return false if the id property is not a string', () => {
    const invalidObject = { id: 123, companies: {} };
    expect(isAuthUser(invalidObject)).toBe(false);
  });

  test('should return false if the companies property is missing', () => {
    const invalidObject = { id: '123' };
    expect(isAuthUser(invalidObject)).toBe(false);
  });

  test('should return false if the companies property is not an object', () => {
    const invalidObject = { id: '123', companies: 'not-an-object' };
    expect(isAuthUser(invalidObject)).toBe(false);
  });

  test('should return false if the companies property is null', () => {
    const invalidObject = { id: '123', companies: null };
    expect(isAuthUser(invalidObject)).toBe(false);
  });

  test('should return false if the companies object has a non-string value', () => {
    const invalidObject = { id: '123', companies: { company1: 'ADMIN', company2: 123 } };
    expect(isAuthUser(invalidObject)).toBe(false);
  });
});
