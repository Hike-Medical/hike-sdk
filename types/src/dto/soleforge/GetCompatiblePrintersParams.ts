import { MachineStatus } from '../../../prisma';

export interface GetCompatiblePrintersParams {
  orderId: string;
  laneId?: string;
  limit?: number;
  statuses?: MachineStatus[];
  /** If true, returns [] when laneId is missing or has no printers */
  mustUseLane?: boolean;
}
