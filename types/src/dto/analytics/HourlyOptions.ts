import { OrderStatus } from '../../../prisma';

export interface DateFilter {
  startDate: string;
  endDate: string;
}

export interface HourlyOptions {
  orderStatuses: OrderStatus[];
  dateFilters: DateFilter;
  removeWeekends?: boolean;
}
