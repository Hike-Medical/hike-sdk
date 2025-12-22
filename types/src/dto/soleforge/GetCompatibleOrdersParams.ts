import { OrderStatus } from '../../../prisma';

export interface GetCompatibleOrdersParams {
  statuses?: OrderStatus[];
}
