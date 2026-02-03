export interface QueueOrderToLaneParams {
  orderId: string;
  laneId: string;
  /** Number of left insole prints to queue (0-10) */
  leftQty: number;
  /** Number of right insole prints to queue (0-10) */
  rightQty: number;
  /** Whether this is a reprint job (affects file naming and label printing) */
  isReprint?: boolean;
  /** JWT token for authorization */
  jwtToken?: string;
}

export interface QueueOrderToLaneResponse {
  /** The batch ID for the created print jobs */
  batchId: string;
  /** Number of jobs created */
  jobCount: number;
  /** IDs of the created print jobs */
  printJobIds: string[];
}
