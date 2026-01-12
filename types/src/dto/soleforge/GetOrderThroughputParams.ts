import { OrderStatus } from '../../../prisma';
import { ThroughputUnit } from './ThroughputUnit';

export type ThroughputOrderType = 'CLINICAL' | 'CONSUMER';
export type ThroughputProductBaseType = 'Functional' | 'Diabetic';

export interface GetOrderThroughputParams {
  startDate: string;
  endDate: string;
  startStatus: OrderStatus;
  endStatus: OrderStatus;
  unit: ThroughputUnit;
  /** Include individual order details in response. Defaults to true. */
  includeOrders?: boolean;
  /** Include comparison to previous period of same length. Defaults to false. */
  includeComparison?: boolean;
  /** Group results by lane. When true, returns byLane array instead of single count. */
  groupByLane?: boolean;
  /** Group results by company. When true, returns byCompany array. */
  groupByCompany?: boolean;
  /** Filter by pair counts (e.g., [1, 2, 3] for 1-pair, 2-pair, 3-pair orders). */
  pairCounts?: number[];
  /** Filter by order types (CLINICAL = admin-web, CONSUMER = consumer-web/insoles-web). */
  orderTypes?: ThroughputOrderType[];
  /** Filter by company IDs. */
  companyIds?: string[];
  /** Filter by product base types (Functional or Diabetic). */
  productBaseTypes?: ThroughputProductBaseType[];
  /** Include SLA bucket metrics (orders grouped by days relative to committed date). */
  includeSLAMetrics?: boolean;
  /** Include Solemate data (orders without a lane ID). Defaults to true. */
  includeSolemateData?: boolean;
}
