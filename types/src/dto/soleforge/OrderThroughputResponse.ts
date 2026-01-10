import { ThroughputUnit } from './ThroughputUnit';

export interface OrderThroughputOrder {
  orderId: string;
  transitionedAt: Date;
  leftCount: number;
  rightCount: number;
  /** Committed delivery date for the order */
  committedDeliveryAt: Date | null;
  /** Date the order was created */
  createdAt: Date;
  /** PO number from the evaluation */
  poNumber: string | null;
  /** Workbench ID for the order */
  workbenchId: string;
}

export interface OrderThroughputComparison {
  previousCount: number;
  /** Percent change from previous period. E.g., 15.5 means +15.5%, -10.2 means -10.2% */
  percentChange: number;
}

export interface OrderThroughputByLane {
  laneId: string | null;
  laneName: string | null;
  count: number;
  orders?: OrderThroughputOrder[];
  comparison?: OrderThroughputComparison;
}

export interface OrderThroughputByCompany {
  companyId: string | null;
  companyName: string | null;
  count: number;
  /** Whether this company's orders are clinical (true) or consumer (false). */
  isClinical: boolean;
  orders?: OrderThroughputOrder[];
  comparison?: OrderThroughputComparison;
}

export interface OrderThroughputBySLA {
  /** Bucket identifier (e.g., 'past_committed', 'same_day') */
  bucket: string;
  /** Human-readable label */
  label: string;
  /** Count in selected unit */
  count: number;
}

export interface OrderThroughputResponse {
  count: number;
  unit: ThroughputUnit;
  orders?: OrderThroughputOrder[];
  comparison?: OrderThroughputComparison;
  /** Results grouped by lane. Only present when groupByLane is true. */
  byLane?: OrderThroughputByLane[];
  /** Results grouped by company. Only present when groupByCompany is true. */
  byCompany?: OrderThroughputByCompany[];
  /** Results grouped by SLA bucket. Only present when includeSLAMetrics is true. */
  bySLA?: OrderThroughputBySLA[];
}
