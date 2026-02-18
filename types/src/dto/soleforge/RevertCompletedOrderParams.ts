import { Order } from '../../../prisma';

export interface RevertCompletedOrderParams {
  orderId: string;
  targetStatus: string;
  ticketId: string;
  revertReason: string;
  source?: string;
  jwtToken?: string;
}

export type RevertCompletedOrderResponse = Order;
