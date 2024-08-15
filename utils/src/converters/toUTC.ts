import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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

  return omitTime ? obj.toDate() : obj.startOf('day').toDate();
};
