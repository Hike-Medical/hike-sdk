import { OrderStatus, ProductType } from '../../../prisma';
import { OperationAnalyticsOrder } from './OperationAnalyticsResponse';

export type ShipByAgeBucket =
  | 'no_ship_date'
  | 'delinquent_3d_plus'
  | 'delinquent_2d'
  | 'delinquent_1d'
  | 'due_today'
  | 'due_this_week'
  | 'due_next_week'
  | 'on_track';

export interface ShipByAgeBucketData {
  bucket: ShipByAgeBucket;
  label: string;
  count: number;
  orders?: OperationAnalyticsOrder[];
}

export interface OrdersByShipByAgeResponse {
  buckets: ShipByAgeBucketData[];
  /** Sum of all delinquent_* buckets */
  totalDelinquent: number;
  /** Count of orders without a ship date */
  totalNoShipDate: number;
}

export interface GetOrdersByShipByAgeParams {
  /** Whether to include order details in the response */
  includeOrders?: boolean;
  /** Statuses to exclude from the results */
  excludeStatus?: OrderStatus[];
  /** Statuses to include in the results (if provided, only these statuses are included, except for always-excluded terminal statuses) */
  includeStatus?: OrderStatus[];
  /** Filter by product types (e.g., INSOLE). Only orders with matching product types are included. */
  productTypes?: ProductType[];
}
