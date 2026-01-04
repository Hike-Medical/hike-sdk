import { MachineStatus } from '../../../prisma';
import { RejectionQuantities } from './RejectionQuantities';

export interface QueuePrintJobsParams {
  orderId: string;
  /** Array of printer IDs for multi-printer selection. When provided, jobs are distributed across these printers. */
  printerIds?: string[];
  laneId?: string;
  quantities?: RejectionQuantities;
  isReprint?: boolean;
  /** Filter printers by machine status (default: ['IDLE']) */
  validPrinterStatuses?: MachineStatus[];
  /** Target number of printers for job distribution. Used by hybrid mode to spread jobs across printers. */
  targetPrinterCount?: number;
}
