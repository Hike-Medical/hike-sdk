export interface CancelLaneQueuedJobParams {
  /** The ID of the lane-queued job to cancel */
  jobId: string;
  /** Reason for cancellation */
  reason: string;
  /** Support ticket ID for audit purposes */
  ticketId: string;
  /** Source UI component where the action was triggered */
  source?: string;
  /** JWT token for authorization */
  jwtToken?: string;
}

export interface CancelLaneQueuedJobResponse {
  /** The cancelled job details */
  cancelledJob: {
    id: string;
    status: string;
  };
}
