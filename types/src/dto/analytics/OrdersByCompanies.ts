export interface OrdersByCompany {
  companyName: string | null;
  companyId: string;
  /** Order count for the selected period */
  count: number;
  /** Order count for the previous period (same duration) */
  previousCount: number;
  /** Absolute change (count - previousCount) */
  delta: number;
  /** Percentage change, null if previousCount is 0 */
  deltaPercent: number | null;
}

export type OrdersByCompaniesResponse = OrdersByCompany[];
