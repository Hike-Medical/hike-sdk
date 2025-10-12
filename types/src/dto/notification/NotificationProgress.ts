export interface NotificationProgress {
  parentJobId: string;
  messageId: string;
  totalPatients: number;
  processed: number;
  isActive: boolean;
  progress: number; // 0-1, overall progress of all batches
  totalBatches: number;
  completedBatches: number;
  remainingBatches: number;
  currentBatch?: {
    batchIndex: number;
    batchOffset: number;
    batchSize: number;
    patientsInBatch: number;
    isProcessing: boolean;
    state: string;
    startsAt?: number; // Unix timestamp (ms) when delayed batch will start
  };
  startedAt?: number | null;
  finishedAt?: number | null;
}
