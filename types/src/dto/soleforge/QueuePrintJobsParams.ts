import { MachineStatus } from '../../../prisma';
import { RejectionQuantities } from './RejectionQuantities';

export interface QueuePrintJobsParams {
  orderId: string;
  printerId?: string;
  /** Array of printer IDs for multi-printer selection. When provided, jobs are distributed across these printers. */
  printerIds?: string[];
  laneId?: string;
  /** If true, returns null when printerId is missing or invalid */
  mustUsePrinter?: boolean;
  /** If true, returns null when laneId is missing or has no printers */
  mustUseLane?: boolean;
  quantities?: RejectionQuantities;
  isReprint?: boolean;
  /** Filter printers by machine status (default: ['IDLE']) */
  validPrinterStatuses?: MachineStatus[];
}
