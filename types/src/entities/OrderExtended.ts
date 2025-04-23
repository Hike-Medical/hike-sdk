import type { Order } from '../../prisma';
import { WorkbenchExtended } from './WorkbenchExtended';

export type OrderExtended = Order & {
  workbench: Omit<WorkbenchExtended, 'orders'>;
};
