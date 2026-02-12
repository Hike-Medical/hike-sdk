export type AnomalyReasonType =
  | 'DISPATCHED_TOO_LONG'
  | 'PRINTING_TOO_LONG'
  | 'COLLECT_TOO_LONG'
  | 'QUEUED_TOO_LONG'
  | 'ORDER_PRINTING_TOO_LONG'
  | 'ORDER_GRINDING_TOO_LONG'
  | 'ORDER_GLUING_TOO_LONG'
  | 'ORDER_FINISHING_TOO_LONG'
  | 'ORDER_SHIPPING_TOO_LONG'
  | 'BLOCKED_JOBS';

export interface AnomalyReason {
  type: AnomalyReasonType;
  /** For print job anomalies, the ID of the affected print job */
  printJobId?: string;
  /** For print job anomalies, the current status of the print job */
  printJobStatus?: string;
  /** How long the entity has been in the anomalous state, in minutes */
  durationMinutes: number;
  /** For BLOCKED_JOBS: number of COMPLETED jobs */
  completedCount?: number;
  /** For BLOCKED_JOBS: number of in-progress jobs (PRINTING, QUEUED, DISPATCHED) */
  inProgressCount?: number;
  /** For BLOCKED_JOBS: required quantity for the order */
  requiredQuantity?: number;
}

export interface AnomalyOrder {
  orderId: string;
  poNumber: string | null;
  companyId: string | null;
  companySlug: string | null;
  orderStatus: string;
  patientFirstName: string | null;
  patientLastName: string | null;
  anomalyReasons: AnomalyReason[];
  /** When the order/job entered the current status (used for display) */
  stuckSince: Date | null;
  /** When the workbench was submitted (committed date) */
  submittedAt: Date | null;
}

export interface AnomalyOrdersResponse {
  orders: AnomalyOrder[];
}
