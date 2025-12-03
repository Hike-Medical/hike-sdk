import dayjs from 'dayjs';

/**
 * Format a date for Stedi API (YYYYMMDD format)
 */
export const formatDateForStedi = (date: string | Date): string => dayjs(date).format('YYYYMMDD');

/**
 * Parse a date from Stedi API response (YYYYMMDD format)
 */
export const parseDateFromStedi = (date: string): string =>
  date.length === 8 ? dayjs(date, 'YYYYMMDD').format('YYYY-MM-DD') : date;
