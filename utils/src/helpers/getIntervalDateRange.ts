import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getIntervalDateRange = (interval: 'week' | 'month'): { startDate: Date; endDate: Date } => {
  const now = dayjs().utc();

  if (interval === 'week') {
    return {
      startDate: now.subtract(7, 'day').startOf('day').toDate(),
      endDate: now.subtract(1, 'day').endOf('day').toDate()
    };
  }

  const lastMonth = now.subtract(1, 'month');
  return {
    startDate: lastMonth.startOf('day').toDate(),
    endDate: now.subtract(1, 'day').endOf('day').toDate()
  };
};
