import { FactoryName, OrderStatus } from '../../../prisma';

export interface GetCompatibleOrdersParams {
  statuses?: OrderStatus[];
  factoryNames?: FactoryName[];
}
