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
}
