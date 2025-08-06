import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getIntervalDateRange = (
  interval: 'day' | 'week' | 'month' | 'lastBusinessDay'
): { startDate: Date; endDate: Date } => {
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
  if (interval === 'lastBusinessDay') {
    const dayOfWeek = now.day();

    let startDate: Date;
    let endDate: Date;

    if (dayOfWeek === 1) {
      startDate = now.subtract(3, 'day').startOf('day').toDate();
      endDate = now.startOf('day').toDate();
    } else {
      startDate = now.subtract(1, 'day').startOf('day').toDate();
      endDate = now.startOf('day').toDate();
    }

    return { startDate, endDate };
  }

  throw new Error('Invalid interval');
};
