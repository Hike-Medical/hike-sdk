export interface SendReprintJobParams {
  rejectionId: string;
  ticketId?: string;
  notes?: string;
  laneId: string;
  rejectedPrintJobIds: string[];
  /** Set to true when approving a reprint for a manually printed order (no printjobs to mark as rejected) */
  isManualPrint?: boolean;
  jwtToken?: string;
}
