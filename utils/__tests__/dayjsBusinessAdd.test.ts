import { describe, expect, test } from '@jest/globals';
import {
  dayjsBusinessAdd as businessAdd,
  WorkingWeek,
} from '../src/helpers/dayjsBusinessAdd';

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const NO_HOLIDAYS = { holidays: [] as string[] };

const chicagoTime = (dateStr: string) => dayjs.tz(dateStr, 'America/Chicago');

describe('dayjsBusinessAdd', () => {
  describe('day unit', () => {
    test('handles businessAdd 0', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06').businessAdd(0);
      expect(result.format('YYYY-MM-DD')).toBe('2024-06-06');
    });

    test('defaults to day unit when unit is omitted', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06').businessAdd(1);
      expect(result.format('YYYY-MM-DD')).toBe('2024-06-07');
    });

    test('skips weekends', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-07').businessAdd(1);
      expect(result.format('YYYY-MM-DD')).toBe('2024-06-10');
    });

    test('respects holidays list', () => {
      businessAdd({ holidays: ['2024-07-04'] }, dayjs, dayjs);
      const result = chicagoTime('2024-07-03').businessAdd(1);
      expect(result.format('YYYY-MM-DD')).toBe('2024-07-05');
    });

    test('adds multiple days across weekends and holidays', () => {
      businessAdd({ holidays: ['2024-07-04'] }, dayjs, dayjs);
      const result = chicagoTime('2024-07-03').businessAdd(3);
      expect(result.format('YYYY-MM-DD')).toBe('2024-07-09');
    });

    test('supports custom working week', () => {
      const sundayToThursday: WorkingWeek = {
        sunday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        monday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        tuesday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        wednesday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        thursday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
      };
      businessAdd({ ...NO_HOLIDAYS, workingWeek: sundayToThursday }, dayjs, dayjs);
      const result = chicagoTime('2024-06-06').businessAdd(1); // Thursday
      expect(result.format('YYYY-MM-DD')).toBe('2024-06-09'); // Sunday
    });
  });

  describe('hour unit', () => {
    test('adds hours within same business day', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 10:00').businessAdd(2, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 12:00');
    });

    test('wraps to next business day when hours exceed remaining time', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 16:30').businessAdd(1, 'hour'); // Thursday 4:30 PM
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-07 09:30');
    });

    test('wraps over weekend', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-07 16:30').businessAdd(1, 'hour'); // Friday 4:30 PM
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-10 09:30');
    });

    test('snaps to business start when before business hours', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 07:00').businessAdd(1, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 10:00');
    });

    test('advances to next business day when after business hours', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 18:00').businessAdd(1, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-07 10:00');
    });

    test('skips holidays', () => {
      businessAdd({ holidays: ['2024-06-07'] }, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 16:30').businessAdd(1, 'hour'); // Thursday 4:30 PM, Friday is holiday
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-10 09:30');
    });

    test('adds full business day worth of hours', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 09:00').businessAdd(8, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 17:00');
    });

    test('spans multiple days', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 09:00').businessAdd(16, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-07 17:00');
    });

    test('starts on weekend and advances to Monday', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-08 12:00').businessAdd(1, 'hour'); // Saturday
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-10 10:00');
    });

    test('handles zero hours', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 10:30').businessAdd(0, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 10:30');
    });

    test('handles fractional hours', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 10:00').businessAdd(1.5, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 11:30');
    });
  });

  describe('minute unit', () => {
    test('adds minutes within same business day', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 10:00').businessAdd(30, 'minute');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 10:30');
    });

    test('wraps to next day when minutes exceed remaining time', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 16:45').businessAdd(30, 'minute');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-07 09:15');
    });
  });

  describe('custom working hours', () => {
    test('respects custom start and end times', () => {
      const earlyWeek: WorkingWeek = {
        monday: { start: { hour: 8, minute: 0 }, end: { hour: 16, minute: 0 } },
        tuesday: { start: { hour: 8, minute: 0 }, end: { hour: 16, minute: 0 } },
        wednesday: { start: { hour: 8, minute: 0 }, end: { hour: 16, minute: 0 } },
        thursday: { start: { hour: 8, minute: 0 }, end: { hour: 16, minute: 0 } },
        friday: { start: { hour: 8, minute: 0 }, end: { hour: 16, minute: 0 } },
      };
      businessAdd({ ...NO_HOLIDAYS, workingWeek: earlyWeek }, dayjs, dayjs);
      const result = chicagoTime('2024-06-06 15:30').businessAdd(1, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-07 08:30');
    });

    test('handles days with different schedules', () => {
      const mixedWeek: WorkingWeek = {
        monday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        tuesday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        wednesday: { start: { hour: 9, minute: 0 }, end: { hour: 13, minute: 0 } }, // Half day Wednesday
        thursday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
        friday: { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
      };
      businessAdd({ ...NO_HOLIDAYS, workingWeek: mixedWeek }, dayjs, dayjs);
      const result = chicagoTime('2024-06-05 12:00').businessAdd(2, 'hour'); // Wednesday noon, only 1 hr left
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-06 10:00');
    });

    test('throws when workingWeek has no days defined', () => {
      const emptyWeek: WorkingWeek = {};
      expect(() => businessAdd({ ...NO_HOLIDAYS, workingWeek: emptyWeek }, dayjs, dayjs)).toThrow(
        'workingWeek must have at least one day defined'
      );
    });

    test('throws when a day has start equal to end', () => {
      const badWeek: WorkingWeek = {
        monday: { start: { hour: 9, minute: 0 }, end: { hour: 9, minute: 0 } },
      };
      expect(() => businessAdd({ ...NO_HOLIDAYS, workingWeek: badWeek }, dayjs, dayjs)).toThrow(
        'workingWeek.monday start must be before end'
      );
    });

    test('throws when a day has start after end', () => {
      const badWeek: WorkingWeek = {
        tuesday: { start: { hour: 17, minute: 0 }, end: { hour: 9, minute: 0 } },
      };
      expect(() => businessAdd({ ...NO_HOLIDAYS, workingWeek: badWeek }, dayjs, dayjs)).toThrow(
        'workingWeek.tuesday start must be before end'
      );
    });
  });

  describe('timezone', () => {
    test('respects timezone set on the dayjs instance', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      const result = dayjs.tz('2024-06-06 16:30', 'America/New_York').businessAdd(1, 'hour');
      expect(result.format('YYYY-MM-DD HH:mm')).toBe('2024-06-07 09:30');
    });
  });

  describe('negative values', () => {
    test('throws on negative day value', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      expect(() => chicagoTime('2024-06-06').businessAdd(-1)).toThrow('businessAdd does not support negative values');
    });

    test('throws on negative hour value', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      expect(() => chicagoTime('2024-06-06 10:00').businessAdd(-2, 'hour')).toThrow(
        'businessAdd does not support negative values'
      );
    });

    test('throws on negative minute value', () => {
      businessAdd(NO_HOLIDAYS, dayjs, dayjs);
      expect(() => chicagoTime('2024-06-06 10:00').businessAdd(-30, 'minute')).toThrow(
        'businessAdd does not support negative values'
      );
    });
  });

  describe('infinite loop safeguard', () => {
    test('throws when no business day can be found within 365 days', () => {
      const everyDayHolidays = Array.from({ length: 366 }, (_, index) =>
        dayjs('2024-06-06').add(index, 'day').format('YYYY-MM-DD')
      );
      businessAdd({ holidays: everyDayHolidays }, dayjs, dayjs);
      expect(() => chicagoTime('2024-06-06 16:30').businessAdd(1, 'hour')).toThrow(
        'Unable to find a business day within 365 days'
      );
    });
  });
});
