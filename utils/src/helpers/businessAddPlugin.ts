import { Dayjs, PluginFunc } from 'dayjs';

export interface BusinessAddOptions {
  holidays?: string[];
  workingWeekdays?: number[];
}

declare module 'dayjs' {
  interface Dayjs {
    businessAdd(days: number);
  }
}

const businessAddPlugin: PluginFunc<BusinessAddOptions> = (opts, dayjsClass) => {
  const workingWeekdays = opts?.workingWeekdays ?? [1, 2, 3, 4, 5];
  const holidaySet = new Set(opts?.holidays ?? []);

  dayjsClass.prototype.businessAdd = function businessAdd(this: Dayjs, days: number): Dayjs {
    let date = this;
    let remaining = days;

    while (remaining > 0) {
      date = date.add(1, 'day');

      const isWeekend = !workingWeekdays.includes(date.day());
      const isHoliday = holidaySet.has(date.format('YYYY-MM-DD'));

      if (!isWeekend && !isHoliday) {
        remaining -= 1;
      }
    }

    return date;
  };
};

export { businessAddPlugin };
