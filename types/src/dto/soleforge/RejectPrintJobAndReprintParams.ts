export interface RejectPrintJobAndReprintParams {
  printJobId: string;
  laneId?: string;
  reasonId?: string;
  customReason?: string;
  ticketId?: string;
  notes?: string;
}

export interface RejectPrintJobAndReprintResponse {
  qcRejectionId: string;
  newPrintJobId: string | null;
  orderId: string;
}
