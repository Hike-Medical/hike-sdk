import { OrderStatus, ProductType } from '../../../prisma';
import { ThroughputUnit } from './ThroughputUnit';

/** SubStatus for DRAFT orders indicating validation stage */
export type DraftSubStatus = 'DEV_VALIDATION' | 'PROD_VALIDATION' | 'VALIDATION_COMPLETE';

export interface OperationAnalyticsOrder {
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
  /** Order status (e.g., TOE_FILLER, NEEDS_MANUFACTURING) */
  status?: OrderStatus;
  /** Date the order was authorized (when authorizationStatus is APPROVED) */
  authorizedAt?: Date | null;
  /** SubStatus for DRAFT orders indicating validation stage (DEV_VALIDATION, PROD_VALIDATION, VALIDATION_COMPLETE) */
  subStatus?: DraftSubStatus;
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
  orders?: OperationAnalyticsOrder[];
  comparison?: OrderThroughputComparison;
}

export interface OrderThroughputByCompany {
  companyId: string | null;
  companyName: string | null;
  count: number;
  /** Whether this company's orders are clinical (true) or consumer (false). */
  isClinical: boolean;
  orders?: OperationAnalyticsOrder[];
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
  orders?: OperationAnalyticsOrder[];
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
  orders?: OperationAnalyticsOrder[];
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
  orders?: OperationAnalyticsOrder[];
  comparison?: OrderThroughputComparison;
}

export interface OrderThroughputByProductBaseType {
  /** Product base type: 'Functional' or 'Diabetic' */
  productBaseType: 'Functional' | 'Diabetic';
  /** Human-readable label */
  label: string;
  /** Count in selected unit */
  count: number;
  /** Orders in this bucket */
  orders?: OperationAnalyticsOrder[];
  comparison?: OrderThroughputComparison;
}

export interface QualityRateMetrics {
  /** Total count in the selected unit (orders, pairs, or insoles) */
  totalCount: number;
  /** Count that had at least one reprint in the selected unit */
  countWithReprints: number;
  /** Orders that had at least one reprint. Only present when includeOrders is true. */
  reprintOrders?: OperationAnalyticsOrder[];
}

export interface OrderThroughputResponse {
  count: number;
  unit: ThroughputUnit;
  orders?: OperationAnalyticsOrder[];
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
  /** Results grouped by product base type. Only present when groupByProductBaseType is true. */
  byProductBaseType?: OrderThroughputByProductBaseType[];
}

export interface OrderStatusCount {
  status: OrderStatus;
  count: number;
  orders?: OperationAnalyticsOrder[];
  /** SubStatus grouping for DRAFT orders - when present, this entry represents a specific validation stage */
  subStatus?: DraftSubStatus;
}

export interface GetOrderStatusCountsParams {
  /** Statuses to exclude from the results */
  excludeStatus?: OrderStatus[];
  /** Filter by product types (e.g., INSOLE). Only orders with matching product types are included. */
  productTypes?: ProductType[];
}

/** @deprecated Use OperationAnalyticsOrder instead */
export type OrderThroughputOrder = OperationAnalyticsOrder;
