import { OrderStatus } from '../../../prisma';
import { ThroughputUnit } from './ThroughputUnit';

export interface GetOrderThroughputParams {
  startDate: string;
  endDate: string;
  startStatus: OrderStatus;
  endStatus: OrderStatus;
  unit: ThroughputUnit;
  /** Include individual order details in response. Defaults to true. */
  includeOrders?: boolean;
  /** Include comparison to previous period of same length. Defaults to false. */
  includeComparison?: boolean;
  /** Group results by lane. When true, returns byLane array instead of single count. */
  groupByLane?: boolean;
}
