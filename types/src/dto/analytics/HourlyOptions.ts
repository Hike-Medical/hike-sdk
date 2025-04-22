import { OrderStatus } from '@prisma/client';
export interface DateFilter {
  startDate: string;
  endDate: string;
}

export interface HourlyOptions {
  orderStatuses: OrderStatus[];
  dateFilters: DateFilter;
  removeWeekends?: boolean;
}
