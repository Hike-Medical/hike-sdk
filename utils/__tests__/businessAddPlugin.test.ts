import { describe, expect, test } from '@jest/globals';
import dayjs from 'dayjs';
import { businessAddPlugin } from '../src/helpers/businessAddPlugin';

describe('businessAddPlugin', () => {
  test('adds business days skipping weekends', () => {
    businessAddPlugin({}, dayjs);
    const start = dayjs('2024-06-07');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-06-10');
  });

  test('respects holidays list', () => {
    businessAddPlugin({ holidays: ['2024-07-04'] }, dayjs);
    const start = dayjs('2024-07-03');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-07-05');
  });

  test('supports custom working weekdays', () => {
    businessAddPlugin({ workingWeekdays: [0, 1, 2, 3, 4] }, dayjs);
    const start = dayjs('2024-06-06');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-06-09');
  });

  test('adds multiple days across weekends and holidays', () => {
    businessAddPlugin({ holidays: ['2024-07-04'] }, dayjs);
    const start = dayjs('2024-07-03');
    const result = start.businessAdd(3);
    expect(result.format('YYYY-MM-DD')).toBe('2024-07-09');
  });
});
