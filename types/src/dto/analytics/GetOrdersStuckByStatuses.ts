import { OrderStatus } from '../../../prisma';
import { Timeframe } from './TimeFrame';

export interface GetStuckOrdersByStatuses extends Timeframe {
  orderStatuses: OrderStatus[];
  days: number;
}
