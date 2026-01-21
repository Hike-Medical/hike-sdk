import { FactoryId, OrderStatus } from '../../../prisma';

export interface GetCompatibleOrdersParams {
  statuses?: OrderStatus[];
  factoryIds?: FactoryId[];
}
