import { ThroughputUnit } from './ThroughputUnit';

export interface OrderThroughputOrder {
  orderId: string;
  transitionedAt: Date;
  leftCount: number;
  rightCount: number;
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

export interface OrderThroughputResponse {
  count: number;
  unit: ThroughputUnit;
  orders?: OrderThroughputOrder[];
  comparison?: OrderThroughputComparison;
  /** Results grouped by lane. Only present when groupByLane is true. */
  byLane?: OrderThroughputByLane[];
  /** Results grouped by company. Only present when groupByCompany is true. */
  byCompany?: OrderThroughputByCompany[];
}
