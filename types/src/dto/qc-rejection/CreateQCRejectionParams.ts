import type { OrderStatus } from '../../../prisma';

export interface CreateQCRejectionParams {
  orderId: string;
  sourceStation: OrderStatus;
  targetStation: OrderStatus;
  reasonId?: string;
  customReason?: string;
  leftQuantity?: number;
  rightQuantity?: number;
  photos?: string[];
}
