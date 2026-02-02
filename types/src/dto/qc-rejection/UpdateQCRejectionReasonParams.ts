import type { OrderStatus } from '../../../prisma';

export interface UpdateQCRejectionReasonParams {
  reasonId: string;
  label?: string;
  description?: string;
  photos?: string[];
  stations?: OrderStatus[];
  active?: boolean;
  sortOrder?: number;
}
