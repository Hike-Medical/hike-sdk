export interface NotificationProgress {
  parentJobId: string;
  totalPatients: number;
  processed: number;
  isActive: boolean;
  progress: number; // 0-1
  currentBatchSize?: number;
  startedAt?: number | null;
  finishedAt?: number | null;
}
