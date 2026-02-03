import type { OrderStatus } from '../../../prisma';
import type { QCRejectionStatus } from './QCRejectionStatus';

export interface GetQCRejectionsParams {
  statuses?: QCRejectionStatus[];
  sourceStations?: OrderStatus[];
  orderId?: string;
  take?: number;
  skip?: number;
}
