import { OrderStatus, ProductType } from '../../../prisma';
import { OperationAnalyticsOrder } from './OperationAnalyticsResponse';

export type SLARiskBucket =
  | 'no_committed_date'
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
  /** Count of orders without a committed delivery date */
  totalNoCommittedDate: number;
}

export interface GetOrdersBySLAParams {
  /** Whether to include order details in the response */
  includeOrders?: boolean;
  /** Statuses to exclude from the results */
  excludeStatus?: OrderStatus[];
  /** Filter by product types (e.g., INSOLE). Only orders with matching product types are included. */
  productTypes?: ProductType[];
}
