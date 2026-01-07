import { PrintJobStatus } from '../../../prisma';

export interface UpdatePrintJobParams {
  printJobId: string;
  status?: PrintJobStatus;
  fileName?: string;
  queuePosition?: number;
  actualStartTime?: Date | string;
  actualEndTime?: Date | string;
  actualMaterialG?: number;
  failureReason?: string;
}
