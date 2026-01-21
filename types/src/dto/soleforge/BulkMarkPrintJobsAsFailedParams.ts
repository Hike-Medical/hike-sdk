export interface BulkMarkPrintJobsAsFailedParams {
  printJobIds: string[];
  ticketId: string;
  failureReason: string;
  jwtToken?: string;
}

export interface BulkMarkPrintJobsAsFailedResponse {
  succeeded: string[];
  failed: { id: string; error: string }[];
}
