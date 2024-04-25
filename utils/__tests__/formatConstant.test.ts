import { describe, expect, test } from '@jest/globals';
import { formatConstant } from '../src/converters/formatConstant';

enum NumberEnum {
  FIRST_VALUE = 1,
  SECOND_VALUE = 2,
  THIRD_VALUE = 3
}

enum StringEnum {
  FIRST_VALUE,
  SECOND_VALUE,
  THIRD_VALUE
}

enum StringValueEnum {
  FIRST_VALUE = 'The FIRST Value',
  SECOND_VALUE = 'The SECOND Value',
  THIRD_VALUE = 'The THIRD Value'
}

describe('formatConstant', () => {
  test('should format enum correctly', () => {
    expect(formatConstant('DELIVERED')).toBe('Delivered');
    expect(formatConstant('ON_HOLD')).toBe('On Hold');
  });

  test('should handle lowercase input', () => {
    expect(formatConstant('accepted')).toBe('Accepted');
    expect(formatConstant('in_stock')).toBe('In Stock');
  });

  test('should handle mixed case input', () => {
    expect(formatConstant('Ordered')).toBe('Ordered');
    expect(formatConstant('Non_Something')).toBe('Non Something');
  });

  test('should handle input with multiple underscores', () => {
    expect(formatConstant('ON__HOLD')).toBe('On Hold');
  });

  test('should format enum with more than two words correctly', () => {
    expect(formatConstant('TEST_ENUM_KEY')).toBe('Test Enum Key');
  });

  test('should format enums with different format', () => {
    expect(formatConstant(NumberEnum.FIRST_VALUE.toString())).toBe('1');
    expect(formatConstant(StringEnum.SECOND_VALUE.toString())).toBe('1');
    expect(formatConstant(StringValueEnum.THIRD_VALUE)).toBe('The Third Value');
  });
});
