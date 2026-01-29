import dayjs from 'dayjs';

/**
 * Calculates the number of business minutes between two dates.
 * Business minutes exclude weekends (Saturday and Sunday).
 *
 * @param from - The start date
 * @param to - The end date (defaults to now)
 * @returns The number of business minutes between the two dates
 */
export function getBusinessMinutesDiff(from: Date, to: Date = new Date()): number {
  const startDay = dayjs(from);
  const endDay = dayjs(to);

  // If start is after end, return 0
  if (startDay.isAfter(endDay)) {
    return 0;
  }

  let businessMinutes = 0;
  let current = startDay;

  // Iterate day by day
  while (current.isBefore(endDay, 'day') || current.isSame(endDay, 'day')) {
    const dayOfWeek = current.day();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (!isWeekend) {
      if (current.isSame(startDay, 'day') && current.isSame(endDay, 'day')) {
        // Same day - count minutes between start and end
        businessMinutes += endDay.diff(startDay, 'minute');
      } else if (current.isSame(startDay, 'day')) {
        // First day - count from start to end of day
        businessMinutes += current.endOf('day').diff(startDay, 'minute');
      } else if (current.isSame(endDay, 'day')) {
        // Last day - count from start of day to end time
        businessMinutes += endDay.diff(current.startOf('day'), 'minute');
      } else {
        // Full business day = 24 hours = 1440 minutes
        businessMinutes += 1440;
      }
    }

    current = current.add(1, 'day').startOf('day');
  }

  return businessMinutes;
}

/**
 * Checks if a date is older than a specified number of business days.
 *
 * @param date - The date to check
 * @param days - The number of business days threshold
 * @returns True if the date is older than the specified business days
 */
export function isOlderThanBusinessDays(date: Date, days: number): boolean {
  const businessMinutesThreshold = days * 24 * 60;
  return getBusinessMinutesDiff(date) > businessMinutesThreshold;
}

/**
 * Checks if a date is older than a specified number of minutes.
 *
 * @param date - The date to check
 * @param minutes - The number of minutes threshold
 * @returns True if the date is older than the specified minutes
 */
export function isOlderThanMinutes(date: Date, minutes: number): boolean {
  const diffMs = Date.now() - date.getTime();
  return diffMs > minutes * 60 * 1000;
}
