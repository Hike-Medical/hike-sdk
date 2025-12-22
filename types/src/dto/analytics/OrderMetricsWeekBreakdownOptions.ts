export interface OrderMetricsWeekBreakdownOptions {
  weekStart: string;
  breakdownBy: 'facility' | 'department';
  startDate: string;
  endDate: string;
  departmentId?: string;
  facilityId?: string;
}
