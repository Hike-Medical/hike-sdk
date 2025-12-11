import { RejectionQuantities } from './RejectionQuantities';

export interface QueuePrintJobsParams {
  orderId: string;
  printerId?: string;
  laneId?: string;
  quantities?: RejectionQuantities;
}
