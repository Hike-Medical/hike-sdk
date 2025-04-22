import type { Order } from '../../prisma/index';
import { WorkbenchExtended } from './WorkbenchExtended';

export type OrderExtended = Order & {
  workbench: Omit<WorkbenchExtended, 'orders'>;
};
