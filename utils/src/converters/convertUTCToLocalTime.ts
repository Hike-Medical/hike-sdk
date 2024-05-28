import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

export const convertUTCToLocalTime = (utcDateStr: string): string => {
  const utcDate = dayjs.utc(utcDateStr);

  const localDate = utcDate.local();

  const localTimeStr = localDate.format('MMM D, YYYY, h:mm A');

  return localTimeStr;
};
