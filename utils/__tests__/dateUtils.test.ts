import { describe, expect } from '@jest/globals';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { fromStartOfUTC, toStartOfUTC } from '../src/helpers/dateUtils';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('dateUtils', () => {
  describe('toStartOfUTC', () => {
    test('converts local date in the start of the day in UTC correctly', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-15T04:00:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-15-2023 12:00 AM');
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-10-15T00:00:00.000Z');
    });

    test('converts local date in the middle of the day in UTC correctly', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-16T02:00:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-15-2023 10:00 PM');
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-10-15T00:00:00.000Z');
    });

    test('handles local date input before midnight correctly, ensuring it remains the same day in UTC', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-16T03:59:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-15-2023 11:59 PM');
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-10-15T00:00:00.000Z');
    });

    test('handles local date input before UTC midnight correctly, ensuring it remains the same day in UTC', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-16T23:59:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-16-2023 07:59 PM');
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-10-16T00:00:00.000Z');
    });

    test('handles local date input after midnight correctly, ensuring it remains the same day in UTC', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-15T04:01:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-15-2023 12:01 AM');
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-10-15T00:00:00.000Z');
    });

    test('accounts for daylight saving time changes', () => {
      const timeZone = 'America/New_York'; // Specify timezone
      const date = new Date('2023-11-05T05:00:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('11-05-2023 01:00 AM'); // November 5, 2023, 01:00 in EDT just before DST ends
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-11-05T00:00:00.000Z');
    });

    test('accounts for daylight saving time changes', () => {
      const timeZone = 'America/New_York'; // Specify timezone
      const date = new Date('2023-11-04T04:00:00Z');
      expect(dayjs.tz(date, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('11-04-2023 12:00 AM'); // November 5, 2023, 01:00 in EDT just before DST ends
      expect(toStartOfUTC(date, timeZone)?.toISOString()).toEqual('2023-11-04T00:00:00.000Z');
    });

    test('handles null input gracefully', () => {
      expect(toStartOfUTC(null)).toBeNull();
    });
  });

  describe('fromStartOfUTC', () => {
    test('converts UTC date to the start of the day in local time correctly', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-15T00:00:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-15-2023 12:00 AM');
    });

    test('converts local time in the middle of the day back to the start of the day in UTC correctly', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-16T00:00:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-16-2023 12:00 AM');
    });

    test('converts time just before local midnight to the start of the same day in local time', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-16T03:59:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-16-2023 12:00 AM');
    });

    test('converts time just before UTC midnight to the start of the same day in local time', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-16T23:59:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-16-2023 12:00 AM');
    });

    test('handles time just after midnight to ensure it remains the same day in local time', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-10-15T04:01:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('10-15-2023 12:00 AM');
    });

    test('accounts for daylight saving time changes when rolling back', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-11-05T05:00:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('11-05-2023 12:00 AM');
    });

    test('accounts for daylight saving time changes when rolling forward', () => {
      const timeZone = 'America/New_York';
      const date = new Date('2023-11-04T04:00:00Z');
      const localDate = fromStartOfUTC(date, dayjs().tz(timeZone).utcOffset() * 60000);
      expect(dayjs.tz(localDate, timeZone).format('MM-DD-YYYY hh:mm A')).toEqual('11-04-2023 12:00 AM');
    });

    test('handles null input gracefully', () => {
      expect(fromStartOfUTC(null)).toBeNull();
    });
  });
});
