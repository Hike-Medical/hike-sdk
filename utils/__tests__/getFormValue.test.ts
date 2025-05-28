import { FormSubmissionTyped } from '@hike/types';
import {
  getBooleanFormValue,
  getNumberArrayFormValue,
  getNumberFormValue,
  getStringArrayFormValue,
  getStringFormValue
} from '../src/helpers/formSubmissionUtils';

describe('getFormValue utilities', () => {
  const submissions: { data?: FormSubmissionTyped['data'] }[] = [
    {
      data: {
        name: 'Thermo Boot',
        tags: ['orthotic', 'afo'],
        quantity: 3,
        measurements: [12.5, 10.2],
        express: true,
        emptyString: '',
        nullValue: null,
        undefinedValue: undefined
      }
    },
    {
      data: {
        name: 'Fallback',
        tags: ['backup'],
        quantity: 5
      }
    },
    {
      data: {}
    }
  ];

  test('should return a string', () => {
    const value = getStringFormValue(submissions, 'name');
    expect(value).toBe('Thermo Boot');
  });

  test('should return a string array', () => {
    const value = getStringArrayFormValue(submissions, 'tags');
    expect(value).toEqual(['orthotic', 'afo']);
  });

  test('should return a number', () => {
    const value = getNumberFormValue(submissions, 'quantity');
    expect(value).toBe(3);
  });

  test('should return a number array', () => {
    const value = getNumberArrayFormValue(submissions, 'measurements');
    expect(value).toEqual([12.5, 10.2]);
  });

  test('should return a boolean', () => {
    const value = getBooleanFormValue(submissions, 'express');
    expect(value).toBe(true);
  });

  test('should return undefined if key is missing', () => {
    const value = getStringFormValue(submissions, 'missingKey');
    expect(value).toBeUndefined();
  });

  test('should skip undefined and null values', () => {
    expect(getStringFormValue(submissions, 'nullValue')).toBeUndefined();
    expect(getStringFormValue(submissions, 'undefinedValue')).toBeUndefined();
  });

  test('should return the first valid match only', () => {
    const altSubmissions: typeof submissions = [
      { data: { name: 123 } }, // invalid type
      { data: { name: 'Valid Name' } } // valid
    ];
    expect(getStringFormValue(altSubmissions, 'name')).toBe('Valid Name');
  });

  test('should return undefined if no value matches type', () => {
    const altSubmissions: typeof submissions = [
      { data: { name: 123 } } // wrong type
    ];
    expect(getStringFormValue(altSubmissions, 'name')).toBeUndefined();
  });
});
