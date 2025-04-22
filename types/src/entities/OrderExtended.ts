import type { Order } from '@prisma/client';
import { WorkbenchExtended } from './WorkbenchExtended';

export type OrderExtended = Order & {
  workbench: Omit<WorkbenchExtended, 'orders'>;
};
