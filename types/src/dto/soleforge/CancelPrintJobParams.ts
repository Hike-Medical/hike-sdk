export interface CancelPrintJobParams {
  printJobId: string;
  ticketId: string;
  cancellationReason: string;
  /** Source UI component where the action was triggered (e.g., "Print Jobs Table", "Lane Modal") */
  source?: string;
  jwtToken?: string;
}

export interface CancelPrintJobResponse {
  cancelledJob: { id: string; status: string };
}
