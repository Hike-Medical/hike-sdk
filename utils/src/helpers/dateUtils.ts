import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts a given local date to the start of that date in UTC.
 * This is useful for storing date-only information in a timezone-agnostic format.
 *
 * @example
 * toStartOfUTC(new Date('2023-10-16T02:00:00Z'), 'America/New_York');
 * // 2023-10-15T00:00:00.000Z
 *
 */
export const toStartOfUTC = (value?: Date | null, timeZone?: string): Date | null | undefined => {
  if (!value) {
    return value;
  }

  // Canadian locale intenally forced for all dates to ensure format is `YYYY-MM-DD`
  const formatted = Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(value);

  const date = new Date(formatted);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

/**
 * Converts a given UTC date to the start of the day in a specified local timezone.
 * This is useful for displaying UTC-stored dates in a local context.
 *
 * @example
 * fromStartOfUTC(new Date('2023-10-16T00:00:00Z'), 'America/New_York');
 * // 2023-10-15T20:00:00.000Z
 *
 */
export const fromStartOfUTC = (value?: Date | null, timeZone?: string): Date | null | undefined =>
  !value
    ? value
    : dayjs
        .tz(dayjs.utc(value).format('YYYY-MM-DD'), timeZone || undefined)
        .startOf('day')
        .toDate();