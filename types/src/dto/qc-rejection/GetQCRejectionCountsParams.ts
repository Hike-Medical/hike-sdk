import type { OrderStatus } from '../../../prisma';
import type { QCRejectionStatus } from './QCRejectionStatus';

export interface GetQCRejectionCountsParams {
  statuses?: QCRejectionStatus[];
  sourceStations?: OrderStatus[];
}
