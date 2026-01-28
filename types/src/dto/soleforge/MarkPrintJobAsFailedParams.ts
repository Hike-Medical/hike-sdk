export interface MarkPrintJobAsFailedParams {
  printJobId: string;
  ticketId: string;
  failureReason: string;
  jwtToken?: string;
}

export interface MarkPrintJobAsFailedResponse {
  failedJob: { id: string; status: string };
}


