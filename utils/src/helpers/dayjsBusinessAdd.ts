import { Dayjs, PluginFunc } from 'dayjs';

export type BusinessUnit = 'minute' | 'hour' | 'day';

declare module 'dayjs' {
  interface Dayjs {
    businessAdd(value: number, unit?: BusinessUnit): this;
  }
}

export interface WorkingDay {
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
}

export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

const DAYS_OF_WEEK: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export type WorkingWeek = Partial<Record<DayOfWeek, WorkingDay>>;

export interface BusinessAddOptions {
  holidays?: string[];
  workingWeek?: WorkingWeek;
}

const DEFAULT_WORKING_DAY: WorkingDay = {
  start: { hour: 9, minute: 0 },
  end: { hour: 17, minute: 0 }
};

export const DEFAULT_WORKING_WEEK: WorkingWeek = {
  monday: DEFAULT_WORKING_DAY,
  tuesday: DEFAULT_WORKING_DAY,
  wednesday: DEFAULT_WORKING_DAY,
  thursday: DEFAULT_WORKING_DAY,
  friday: DEFAULT_WORKING_DAY
};

/** Observed US federal holidays from 2026 through 2030. */
export const FEDERAL_HOLIDAYS: string[] = [
  // 2026
  '2026-01-01', // New Year's Day
  '2026-01-19', // MLK Day
  '2026-02-16', // Presidents' Day
  '2026-05-25', // Memorial Day
  '2026-06-19', // Juneteenth
  '2026-07-03', // Independence Day (observed)
  '2026-09-07', // Labor Day
  '2026-10-12', // Columbus Day
  '2026-11-11', // Veterans Day
  '2026-11-26', // Thanksgiving
  '2026-12-25', // Christmas Day
  // 2027
  '2027-01-01', // New Year's Day
  '2027-01-18', // MLK Day
  '2027-02-15', // Presidents' Day
  '2027-05-31', // Memorial Day
  '2027-06-18', // Juneteenth (observed)
  '2027-07-05', // Independence Day (observed)
  '2027-09-06', // Labor Day
  '2027-10-11', // Columbus Day
  '2027-11-11', // Veterans Day
  '2027-11-25', // Thanksgiving
  '2027-12-24', // Christmas Day (observed)
  '2027-12-31', // New Year's Day 2028 (observed)
  // 2028
  '2028-01-17', // MLK Day
  '2028-02-21', // Presidents' Day
  '2028-05-29', // Memorial Day
  '2028-06-19', // Juneteenth
  '2028-07-04', // Independence Day
  '2028-09-04', // Labor Day
  '2028-10-09', // Columbus Day
  '2028-11-10', // Veterans Day (observed)
  '2028-11-23', // Thanksgiving
  '2028-12-25', // Christmas Day
  // 2029
  '2029-01-01', // New Year's Day
  '2029-01-15', // MLK Day
  '2029-02-19', // Presidents' Day
  '2029-05-28', // Memorial Day
  '2029-06-19', // Juneteenth
  '2029-07-04', // Independence Day
  '2029-09-03', // Labor Day
  '2029-10-08', // Columbus Day
  '2029-11-12', // Veterans Day (observed)
  '2029-11-22', // Thanksgiving
  '2029-12-25', // Christmas Day
  // 2030
  '2030-01-01', // New Year's Day
  '2030-01-21', // MLK Day
  '2030-02-18', // Presidents' Day
  '2030-05-27', // Memorial Day
  '2030-06-19', // Juneteenth
  '2030-07-04', // Independence Day
  '2030-09-02', // Labor Day
  '2030-10-14', // Columbus Day
  '2030-11-11', // Veterans Day
  '2030-11-28', // Thanksgiving
  '2030-12-25'  // Christmas Day
];

function toMinutes(time: { hour: number; minute: number }): number {
  return time.hour * 60 + time.minute;
}

/**
 * Dayjs plugin that adds business-day and business-hour arithmetic.
 * For timezone-aware calculations, set the timezone on the dayjs instance
 * before calling businessAdd (e.g. `dayjs().tz('America/Chicago').businessAdd(1, 'hour')`).
 */
export const dayjsBusinessAdd: PluginFunc<BusinessAddOptions> = (opts, dayjsClass) => {
  const workingWeek: WorkingWeek = opts?.workingWeek ?? DEFAULT_WORKING_WEEK;

  if (opts?.workingWeek) {
    const definedDays = Object.entries(workingWeek).filter(
      (entry): entry is [string, WorkingDay] => entry[1] !== undefined
    );

    if (definedDays.length === 0) {
      throw new Error('workingWeek must have at least one day defined');
    }

    definedDays.forEach(([day, schedule]) => {
      if (!schedule.start || !schedule.end) {
        throw new Error(`workingWeek.${day} must have both start and end defined`);
      }
      if (toMinutes(schedule.start) >= toMinutes(schedule.end)) {
        throw new Error(`workingWeek.${day} start must be before end`);
      }
    });
  }

  const holidaySet = new Set(opts?.holidays ?? FEDERAL_HOLIDAYS);

  const dayName = (date: Dayjs): DayOfWeek => DAYS_OF_WEEK[date.day()] as DayOfWeek;

  const isBusinessDay = (date: Dayjs): boolean =>
    workingWeek[dayName(date)] !== undefined && !holidaySet.has(date.format('YYYY-MM-DD'));

  const advanceToNextBusinessDayStart = (date: Dayjs): Dayjs => {
    let next = date.add(1, 'day').startOf('day');
    while (!isBusinessDay(next)) {
      next = next.add(1, 'day');
    }
    const schedule = workingWeek[dayName(next)] as WorkingDay;
    return next.hour(schedule.start.hour).minute(schedule.start.minute).second(0).millisecond(0);
  };

  dayjsClass.prototype.businessAdd = function businessAdd(
    this: Dayjs,
    value: number,
    unit: BusinessUnit = 'day'
  ): Dayjs {
    if (value < 0) {
      throw new Error(`businessAdd does not support negative values (received ${value})`);
    }

    let current: Dayjs = this;

    if (unit === 'day') {
      let remaining = value;
      while (remaining > 0) {
        current = current.add(1, 'day');
        if (isBusinessDay(current)) {
          remaining -= 1;
        }
      }
      return current;
    }

    let remainingMinutes = unit === 'hour' ? value * 60 : value;

    while (remainingMinutes > 0) {
      const schedule = workingWeek[dayName(current)];
      const isHoliday = holidaySet.has(current.format('YYYY-MM-DD'));

      if (!schedule || isHoliday) {
        current = advanceToNextBusinessDayStart(current);
        continue;
      }

      const startMin = toMinutes(schedule.start);
      const endMin = toMinutes(schedule.end);
      const currentMin = current.hour() * 60 + current.minute();

      if (currentMin < startMin) {
        current = current.hour(schedule.start.hour).minute(schedule.start.minute).second(0).millisecond(0);
        continue;
      }

      if (currentMin >= endMin) {
        current = advanceToNextBusinessDayStart(current);
        continue;
      }

      const minutesLeftToday = endMin - currentMin;

      if (remainingMinutes <= minutesLeftToday) {
        current = current.add(remainingMinutes, 'minute');
        remainingMinutes = 0;
      } else {
        remainingMinutes -= minutesLeftToday;
        current = advanceToNextBusinessDayStart(current);
      }
    }

    return current;
  };
};
