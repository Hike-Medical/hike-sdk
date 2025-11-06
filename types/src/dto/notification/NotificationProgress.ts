export interface NotificationProgress {
  rootJobId: string;
  messageId: string;
  totalPatients: number;
  processed: number;
  isActive: boolean;
  progress: number; // 0-1, overall progress of all batches
  totalBatches: number;
  completedBatches: number;
  remainingBatches: number;
  failedBatches: number;
  currentBatch?: {
    batchIndex: number;
    batchSize: number;
    isProcessing: boolean;
    state: string;
    startsAt?: number; // Unix timestamp (ms) when delayed batch will start
  };
  startedAt?: number | null;
  finishedAt?: number | null;
}
