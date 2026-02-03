import type { PrintJobStatus } from '../../../prisma';

export interface PrintJobWithDetails {
  id: string;
  side: 'LEFT' | 'RIGHT';
  status: PrintJobStatus;
  actualStartTime: Date | null;
  actualEndTime: Date | null;
  printerName: string | null;
  laneName: string | null;
}
