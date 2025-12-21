import { MachineStatus } from '../../../prisma';

export interface GetCompatiblePrintersParams {
  orderId: string;
  laneId?: string;
  limit?: number;
  statuses?: MachineStatus[];
}
