import { Order } from '../../../prisma';

export interface RevertManualReprintOrderParams {
  orderId: string;
  ticketId: string;
  revertReason: string;
  source?: string;
  jwtToken?: string;
}

export type RevertManualReprintOrderResponse = Order;
