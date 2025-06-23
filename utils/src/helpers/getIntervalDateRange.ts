import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getIntervalDateRange = (interval: 'week' | 'month' | 'day'): { startDate: Date; endDate: Date } => {
  const now = dayjs().utc();

  if (interval === 'day') {
    return {
      startDate: now.startOf('day').toDate(),
      endDate: now.endOf('day').toDate()
    };
  }

  if (interval === 'week') {
    return {
      startDate: now.subtract(7, 'day').startOf('day').toDate(),
      endDate: now.subtract(1, 'day').endOf('day').toDate()
    };
  }

  if (interval === 'month') {
    const lastMonth = now.subtract(1, 'month');
    return {
      startDate: lastMonth.startOf('day').toDate(),
      endDate: now.subtract(1, 'day').endOf('day').toDate()
    };
  }

  throw new Error('Invalid interval');
};
