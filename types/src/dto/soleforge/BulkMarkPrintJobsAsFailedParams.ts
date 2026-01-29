export interface BulkMarkPrintJobsAsFailedParams {
  printJobIds: string[];
  ticketId: string;
  failureReason: string;
  /** Source UI component where the action was triggered (e.g., "Print Jobs Table (Bulk)") */
  source?: string;
  jwtToken?: string;
}

export interface BulkMarkPrintJobsAsFailedResponse {
  succeeded: string[];
  failed: { id: string; error: string }[];
}
