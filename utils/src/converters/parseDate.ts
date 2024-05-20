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

export const formatDate = (value: string | number | Date | null | undefined, format: string): string | null => {
  const object = dayjs(value);

  if (!object.isValid()) {
    return null;
  }

  return object.format(format);
};
