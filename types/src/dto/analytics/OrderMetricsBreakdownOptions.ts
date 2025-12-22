export interface OrderMetricsBreakdownOptions {
  breakdownBy: 'facility' | 'department';
  startDate: string;
  endDate: string;
  departmentId?: string;
  facilityId?: string;
}

