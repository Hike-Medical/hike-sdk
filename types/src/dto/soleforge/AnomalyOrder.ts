export type AnomalyReasonType =
  | 'DISPATCHED_TOO_LONG'
  | 'PRINTING_TOO_LONG'
  | 'COLLECT_TOO_LONG'
  | 'QUEUED_TOO_LONG'
  | 'ORDER_PRINTING_TOO_LONG'
  | 'ORDER_GRINDING_TOO_LONG'
  | 'ORDER_GLUING_TOO_LONG'
  | 'ORDER_FINISHING_TOO_LONG'
  | 'ORDER_SHIPPING_TOO_LONG';

export interface AnomalyReason {
  type: AnomalyReasonType;
  /** For print job anomalies, the ID of the affected print job */
  printJobId?: string;
  /** For print job anomalies, the current status of the print job */
  printJobStatus?: string;
  /** How long the entity has been in the anomalous state, in minutes */
  durationMinutes: number;
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
}

export interface AnomalyOrdersResponse {
  orders: AnomalyOrder[];
}
