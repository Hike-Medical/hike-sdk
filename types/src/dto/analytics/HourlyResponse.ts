import { OrderStatus } from '../../../prisma';

/**
 * Response structure for order statuses per hour endpoint.
 * Each item represents a single order status with its hourly counts.
 */
export interface HourlyResponse {
  /** The order status */
  status: OrderStatus;
  /** Map of hour timestamps to count data */
  countsPerHour: Record<
    string,
    {
      /** Total count for this hour */
      total: number;
      /** Map of user emails to their individual counts (only tracked for certain statuses) */
      users: Record<string, number>;
    }
  >;
}
