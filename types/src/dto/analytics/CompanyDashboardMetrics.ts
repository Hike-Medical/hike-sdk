export interface DashboardFacility {
  facilityName: string | null;
  orderCount: number;
}

export interface DashboardDepartment {
  departmentName: string | null;
  orderCount: number;
}

export interface CompanyDashboardMetrics {
  orderVolume: number;
  engagedPatients: number;
  engagementPercent: number;
  totalOrders: number;
  topFacilities: DashboardFacility[];
  topDepartments: DashboardDepartment[];
}

export type CompanyDashboardMetricsResponse = CompanyDashboardMetrics;
