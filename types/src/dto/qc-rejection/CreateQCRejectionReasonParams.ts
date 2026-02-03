import type { OrderStatus } from '../../../prisma';

export interface CreateQCRejectionReasonParams {
  label: string;
  description?: string;
  photos?: string[];
  stations: OrderStatus[];
}
