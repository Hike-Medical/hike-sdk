import { FactoryName, OrderStatus } from '../../../prisma';

export interface GetCompatibleOrdersParams {
  statuses?: OrderStatus[];
  factoryNames?: FactoryName[];
  /**
   * When true, excludes orders that require manual reprinting (e.g., size > 13).
   * These orders should be handled through the manual reprint workflow.
   */
  excludeManualReprintOrders?: boolean;
}
