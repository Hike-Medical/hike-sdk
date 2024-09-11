import { describe, expect, test } from '@jest/globals';
import { parseClinicianName } from '../src/converters/parseClinicianName';

describe('parseClinicianName tests', () => {
  test('should parse "Macadan, CO, LO, CPA, Marco" correctly', () => {
    const result = parseClinicianName('Macadan, CO, LO, CPA, Marco');
    expect(result).toEqual({
      firstName: 'Marco',
      middleName: null,
      lastName: 'Macadan'
    });
  });

  test('should parse "Macadan, CO, LO, CPA, Marco A" correctly', () => {
    const result = parseClinicianName('Macadan, CO, LO, CPA, Marco A');
    expect(result).toEqual({
      firstName: 'Marco',
      middleName: 'A',
      lastName: 'Macadan'
    });
  });

  test('should parse "Macadan, CO, LO, CPA, CFo., Jan Jo" correctly', () => {
    const result = parseClinicianName('Macadan, CO, LO, CPA, CFo., Jan Jo');
    expect(result).toEqual({
      firstName: 'Jan',
      middleName: 'Jo',
      lastName: 'Macadan'
    });
  });

  test('should parse "Patridge, CP, BOCOP, David" correctly', () => {
    const result = parseClinicianName('Patridge, CP, BOCOP, David');
    expect(result).toEqual({
      firstName: 'David',
      middleName: null,
      lastName: 'Patridge'
    });
  });

  test('should parse "Gossett, LPO, CPO, CPed, CFo, Philip Bryce" correctly', () => {
    const result = parseClinicianName('Gossett, LPO, CPO, CPed, CFo, Philip Bryce');
    expect(result).toEqual({
      firstName: 'Philip',
      middleName: 'Bryce',
      lastName: 'Gossett'
    });
  });

  test('should parse "Smith, CPed, CPA, CPO, John" correctly', () => {
    const result = parseClinicianName('Smith, CPed, CPA, CPO, John');
    expect(result).toEqual({
      firstName: 'John',
      middleName: null,
      lastName: 'Smith'
    });
  });

  test('should parse "Smith, CPed, CPA, CPO, John A." correctly', () => {
    const result = parseClinicianName('Smith, CPed, CPA, CPO, John A.');
    expect(result).toEqual({
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Smith'
    });
  });

  test('should parse "Doe, CO, CPA, MD, John" correctly', () => {
    const result = parseClinicianName('Doe, CO, CPA, MD, John');
    expect(result).toEqual({
      firstName: 'John',
      middleName: null,
      lastName: 'Doe'
    });
  });

  test('should parse "Doe, CO, LO, CPA, CPO, John A." correctly', () => {
    const result = parseClinicianName('Doe, CO, LO, CPA, CPO, John A.');
    expect(result).toEqual({
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe'
    });
  });

  test('should parse "Patridge, CP, BOCOP, CPO, David Mark" correctly', () => {
    const result = parseClinicianName('Patridge, CP, BOCOP, CPO, David Mark');
    expect(result).toEqual({
      firstName: 'David',
      middleName: 'Mark',
      lastName: 'Patridge'
    });
  });

  test('should parse "Jane Jo Doe" correctly', () => {
    const result = parseClinicianName('Jane Jo Doe');
    expect(result).toEqual({
      firstName: 'Jane',
      middleName: 'Jo',
      lastName: 'Doe'
    });
  });

  test('should parse "John Smith" correctly', () => {
    const result = parseClinicianName('John Smith');
    expect(result).toEqual({
      firstName: 'John',
      middleName: null,
      lastName: 'Smith'
    });
  });

  test('should handle single name "Smith" correctly', () => {
    const result = parseClinicianName('Smith');
    expect(result).toEqual({
      firstName: 'Smith',
      middleName: null,
      lastName: ''
    });
  });

  test('should handle extra spaces and special characters "   John   Doe    " correctly', () => {
    const result = parseClinicianName('   John   Doe    ');
    expect(result).toEqual({
      firstName: 'John',
      middleName: null,
      lastName: 'Doe'
    });
  });
});
