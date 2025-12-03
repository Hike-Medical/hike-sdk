export interface OrderMetricsResponse {
  orderVolume: number;
  totalOrders: number;
  totalPatients: number;
  engagementPercent: number;
  topFacilities: {
    name: string;
    orderCount: number;
  }[];
  topDepartments: {
    name: string;
    orderCount: number;
  }[];
  /** All facilities that have at least one order */
  facilitiesWithOrders: {
    name: string;
    orderCount: number;
  }[];
  /** All departments that have at least one order */
  departmentsWithOrders: {
    name: string;
    orderCount: number;
  }[];
}
