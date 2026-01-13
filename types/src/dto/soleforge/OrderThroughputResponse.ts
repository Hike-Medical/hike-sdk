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
  /** True when previousCount was 0 and current count > 0 (infinite growth from zero baseline) */
  isNew?: boolean;
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
  /** Orders in this SLA bucket. Only present when includeOrders is true. */
  orders?: OrderThroughputOrder[];
}

/** Addon types that can be tracked in order throughput (clinical orders only) */
export type ClinicalAddonType =
  | 'metPad'
  | 'metBar'
  | 'dancerPad'
  | 'toeCrest'
  | 'cuboidRaise'
  | 'mortonExtension'
  | 'reverseMortonExtension'
  | 'forefootPosting'
  | 'rearfootPosting';

export interface OrderThroughputByPairCount {
  /** Number of pairs (1, 2, or 3) */
  pairCount: number;
  /** Count in selected unit */
  count: number;
  /** Orders in this pair count bucket */
  orders?: OrderThroughputOrder[];
  comparison?: OrderThroughputComparison;
}

export interface OrderThroughputByAddon {
  /** Addon type identifier */
  addonType: ClinicalAddonType;
  /** Human-readable label */
  label: string;
  /** Count in selected unit */
  count: number;
  /** Orders with this addon */
  orders?: OrderThroughputOrder[];
  comparison?: OrderThroughputComparison;
}

export interface QualityRateMetrics {
  /** Total count in the selected unit (orders, pairs, or insoles) */
  totalCount: number;
  /** Count that had at least one reprint in the selected unit */
  countWithReprints: number;
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
  /** Quality rate metrics for OEE calculation. Only present when includeQualityRateMetrics is true. */
  qualityRateMetrics?: QualityRateMetrics;
  /** Results grouped by pair count (1, 2, 3 pairs). Only present when groupByPairCount is true. */
  byPairCount?: OrderThroughputByPairCount[];
  /** Results grouped by clinical addon type. Only present when groupByAddon is true. */
  byAddon?: OrderThroughputByAddon[];
}
