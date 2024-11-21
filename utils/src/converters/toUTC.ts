import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ToUTCOptions {
  omitTime?: boolean;
}

/**
 * Safely converts date to UTC.
 */
export const toUTC = (value: Date, { omitTime = false }: ToUTCOptions = {}): Date | null => {
  const obj = dayjs.utc(value);

  if (!obj.isValid()) {
    return null;
  }

  return omitTime ? obj.startOf('day').toDate() : obj.toDate();
};

/**
 * Converts a client-side date to UTC and resets the time to 00:00:00.
 *
 * @example
 * toUTCDateOnly('2024-10-31T16:00:00.000Z'); // 2024-11-01T00:00:00.000Z
 */
export const toUTCDateOnly = (date: string | Date | null | undefined): Date | null => {
  if (date == null) {
    return null;
  }

  const formatted = dayjs(date).format('YYYY-MM-DD');
  return dayjs.utc(formatted).toDate();
};

/**
 * Converts a UTC date from the database back to a local date for the client.
 *
 * @example
 * fromUTCDateOnly('2024-11-01T00:00:00.000Z'); // 2024-10-31T16:00:00.000Z
 */
export const fromUTCDateOnly = (date: string | Date | null | undefined): Date | null => {
  if (date == null) {
    return null;
  }

  const formatted = dayjs.utc(date).format('YYYY-MM-DD');
  return dayjs(formatted).toDate();
};
