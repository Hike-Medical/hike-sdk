import { PrintJobStatus, Side } from '../../../prisma';

/**
 * Represents a print job entry in the lane queue.
 * Used for displaying lane queue contents in the UI.
 */
export interface LaneQueueEntry {
  /** Print job ID */
  id: string;
  /** Position in the lane queue (lower = higher priority) */
  laneQueuePosition: number;
  /** Current status of the job */
  status: PrintJobStatus;
  /** Asset ID being printed */
  assetId: string;
  /** Order ID this job belongs to */
  orderId: string;
  /** Batch ID for grouped jobs */
  batchId: string | null;
  /** G-code filename */
  fileName: string | null;
  /** When the job was created */
  createdAt: Date;
  /** Order details for display */
  order: {
    id: string;
    poNumber: string | null;
    companyName: string;
    patientName: string;
  };
  /** Asset details for display */
  asset: {
    id: string;
    type: string;
    side: Side | null;
  };
}
