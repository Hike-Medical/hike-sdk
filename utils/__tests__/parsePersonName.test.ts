import { describe, expect, test } from '@jest/globals';
import { parsePersonName } from '../src/converters/parsePersonName';

describe('parsePersonName tests', () => {
  test('handles last name first with a comma and middle initial', () => {
    expect(parsePersonName('Ealey, Jerry L')).toEqual({ firstName: 'Jerry', middleName: 'L', lastName: 'Ealey' });
  });

  test('handles last name first without middle name', () => {
    expect(parsePersonName('Camerer, Malin')).toEqual({ firstName: 'Malin', middleName: null, lastName: 'Camerer' });
  });

  test('handles first name first without middle name', () => {
    expect(parsePersonName('Rick James')).toEqual({ firstName: 'Rick', middleName: null, lastName: 'James' });
  });

  test('handles first name first with middle name', () => {
    expect(parsePersonName('James Larry Jones')).toEqual({
      firstName: 'James',
      middleName: 'Larry',
      lastName: 'Jones'
    });
  });

  test('handles first name first with middle initial', () => {
    expect(parsePersonName('Jane V. Odesa')).toEqual({ firstName: 'Jane', middleName: 'V.', lastName: 'Odesa' });
  });

  test('handles last name first with suffix', () => {
    expect(parsePersonName('Cookson Jr, George F')).toEqual({
      firstName: 'George',
      middleName: 'F',
      lastName: 'Cookson Jr'
    });
  });

  test('handles names without comma and multiple middle names', () => {
    expect(parsePersonName('Julia Scarlett Elizabeth Louis-Dreyfus')).toEqual({
      firstName: 'Julia',
      middleName: 'Scarlett Elizabeth',
      lastName: 'Louis-Dreyfus'
    });
  });

  test('handles single-word names', () => {
    expect(parsePersonName('Prince')).toEqual({ firstName: 'Prince', middleName: null, lastName: '' });
  });

  test('handles edge case with leading and trailing spaces', () => {
    expect(parsePersonName('  Washington, George  ')).toEqual({
      firstName: 'George',
      middleName: null,
      lastName: 'Washington'
    });
  });

  test('returns empty parts for empty input', () => {
    expect(parsePersonName('')).toEqual({ firstName: '', middleName: null, lastName: '' });
  });

  test('handles input with only spaces', () => {
    expect(parsePersonName('   ')).toEqual({ firstName: '', middleName: null, lastName: '' });
  });

  test('handles input with only a comma', () => {
    expect(parsePersonName(',')).toEqual({ firstName: '', middleName: null, lastName: '' });
  });

  test('handles input with a comma but no first name', () => {
    expect(parsePersonName('Smith, ')).toEqual({ firstName: '', middleName: null, lastName: 'Smith' });
  });

  // TODO: Handle complex person name with prefix nand suffix
  xtest('handles names with prefixes and suffixes without commas', () => {
    expect(parsePersonName('Dr. John Philip Sousa IV')).toEqual({
      firstName: 'John',
      middleName: 'Philip',
      lastName: 'Sousa IV'
    });
  });
});
