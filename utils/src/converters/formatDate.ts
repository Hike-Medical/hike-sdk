import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

/**
 * Formats a date according to the specified localization template.
 *
 * @example
 * formatDate('2024-05-13T15:42:26.627Z');
 * // e.g., "May 13, 2024"
 *
 * formatDate('2024-05-13');
 * // e.g., "May 13, 2024"
 *
 */
export const formatDate = (value: string | number | Date = new Date(), template = 'll'): string | null => {
  const obj = dayjs(value);

  if (!obj.isValid()) {
    return null;
  }

  return obj.format(template);
};

/**
 * Formats a date and time according to the specified localization template.
 *
 * @example
 * formatDateTime('2024-05-13T19:42:00Z');
 * // e.g., "May 13, 2024 7:42 PM"
 *
 */
export const formatDateTime = (value: string | number | Date = new Date()): string | null => formatDate(value, 'lll');
