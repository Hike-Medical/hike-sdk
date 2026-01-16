export interface CancelPrintJobParams {
  printJobId: string;
  cancellationReason: string;
  jwtToken?: string;
}

export interface CancelPrintJobResponse {
  cancelledJob: { id: string; status: string };
}
