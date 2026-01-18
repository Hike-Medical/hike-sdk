export interface OrderMetricsResponse {
  orderVolume: number;
  totalOrders: number;
  totalPatients: number;
  engagementPercent: number;
  /** Patients billed in current activation sequence with no previous sequence billing */
  newPatients: number;
  /** Patients billed in current activation sequence who were also billed in a previous sequence */
  returningPatients: number;
}
