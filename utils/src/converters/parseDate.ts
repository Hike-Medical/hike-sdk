import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const parseDate = (value: string | number | Date | null | undefined, format?: string): Date | null => {
  if (value == null) {
    return null;
  }

  const parsed = dayjs(value, format);
  return parsed.isValid() ? parsed.toDate() : null;
};
