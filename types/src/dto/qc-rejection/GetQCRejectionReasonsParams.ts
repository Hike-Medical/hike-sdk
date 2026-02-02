import type { OrderStatus } from '../../../prisma';

export interface GetQCRejectionReasonsParams {
  station?: OrderStatus;
  activeOnly?: boolean;
}
