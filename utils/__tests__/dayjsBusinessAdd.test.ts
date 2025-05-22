import { describe, expect, test } from '@jest/globals';
import { dayjsBusinessAdd as businessAdd } from '../src/helpers/dayjsBusinessAdd';

const dayjs = require('dayjs');

describe('dayjsBusinessAdd', () => {
  test('adds business days', () => {
    businessAdd({}, dayjs, dayjs);
    const start = dayjs('2024-06-06');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-06-07');
  });

  test('adds business days skipping weekends', () => {
    businessAdd({}, dayjs, dayjs);
    const start = dayjs('2024-06-07');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-06-10');
  });

  test('respects holidays list', () => {
    businessAdd({ holidays: ['2024-07-04'] }, dayjs, dayjs);
    const start = dayjs('2024-07-03');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-07-05');
  });

  test('supports custom working weekdays', () => {
    businessAdd({ workingWeekdays: [0, 1, 2, 3, 4] }, dayjs, dayjs);
    const start = dayjs('2024-06-06');
    const result = start.businessAdd(1);
    expect(result.format('YYYY-MM-DD')).toBe('2024-06-09');
  });

  test('adds multiple days across weekends and holidays', () => {
    businessAdd({ holidays: ['2024-07-04'] }, dayjs, dayjs);
    const start = dayjs('2024-07-03');
    const result = start.businessAdd(3);
    expect(result.format('YYYY-MM-DD')).toBe('2024-07-09');
  });
});
