import { EnrollPatientsParams } from './EnrollPatientsParams';

export interface NotificationProgress {
  rootJobId: string;
  messageId: string;
  sequence?: number;
  totalPatients: number;
  processed: number;
  isActive: boolean;
  progress: number; // 0-1, overall progress of all batches
  totalBatches: number;
  completedBatches: number;
  remainingBatches: number;
  failedBatches: number;
  params: EnrollPatientsParams;
  currentBatch?: {
    batchIndex: number;
    batchSize: number;
    isProcessing: boolean;
    state: string;
    startsAt?: number;
  };
  startedAt?: number | null;
  finishedAt?: number | null;
}
