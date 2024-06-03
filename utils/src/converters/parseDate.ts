import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const parseDate = (value: string | number | Date | null | undefined): Date | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.toDate() : null;
};
