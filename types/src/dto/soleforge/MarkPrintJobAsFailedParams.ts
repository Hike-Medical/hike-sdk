export interface MarkPrintJobAsFailedParams {
  printJobId: string;
  failureReason: string;
  jwtToken?: string;
}

export interface MarkPrintJobAsFailedResponse {
  failedJob: { id: string; status: string };
}


