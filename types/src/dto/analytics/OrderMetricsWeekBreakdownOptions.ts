export interface OrderMetricsWeekBreakdownOptions {
  weekStart: string;
  breakdownBy: 'facility' | 'department';
  departmentId?: string;
  facilityId?: string;
}
