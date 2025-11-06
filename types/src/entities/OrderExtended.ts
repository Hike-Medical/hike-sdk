import type { Order, OrderStatusEvent } from '../../prisma';
import { WorkbenchExtended } from './WorkbenchExtended';

export type OrderExtended = Order & {
  workbench: Omit<WorkbenchExtended, 'orders'>;
  statusEvents?: OrderStatusEvent[];
};
