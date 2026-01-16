import { OperationAnalyticsOrder } from './OperationAnalyticsResponse';

export type SLARiskBucket =
  | 'breached'
  | 'critical_2d'
  | 'warning_2_7d'
  | 'caution_7_14d'
  | 'healthy_14_plus';

export interface SLARiskBucketData {
  bucket: SLARiskBucket;
  label: string;
  count: number;
  orders?: OperationAnalyticsOrder[];
}

export interface OrdersBySLAResponse {
  buckets: SLARiskBucketData[];
  /** Sum of breached + critical_2d + warning_2_7d */
  totalAtRisk: number;
}

export interface GetOrdersBySLAParams {
  /** Whether to include order details in the response */
  includeOrders?: boolean;
}
