/**
 * Statistics about a lane's print job queue.
 * Used for monitoring and capacity planning.
 */
export interface LaneQueueStats {
  /** Lane ID */
  laneId: string;
  /** Lane name for display */
  laneName: string;
  /** Total number of jobs in the lane queue */
  queueDepth: number;
  /** Number of distinct orders with queued jobs */
  ordersInQueue: number;
  /** Estimated wait time in minutes for a new job */
  estimatedWaitMinutes: number | null;
  /** Timestamp of the oldest job in queue */
  oldestJobCreatedAt: Date | null;
  /** Number of idle printers in this lane */
  idlePrinterCount: number;
  /** Total number of printers in this lane */
  totalPrinterCount: number;
}

/**
 * Response for getting lane queued job count.
 */
export interface LaneQueuedJobCountResponse {
  /** Number of jobs in the lane queue */
  count: number;
}
