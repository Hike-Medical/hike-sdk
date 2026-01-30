export interface MarkPrintJobAsFailedParams {
  printJobId: string;
  ticketId: string;
  failureReason: string;
  /** Source UI component where the action was triggered (e.g., "Print Jobs Table", "Lane Modal") */
  source?: string;
  jwtToken?: string;
}

export interface MarkPrintJobAsFailedResponse {
  failedJob: { id: string; status: string };
}


