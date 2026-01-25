import { Order } from '../../../prisma';

export interface RevertGrindingOrderParams {
  orderId: string;
  ticketId: string;
  revertReason: string;
  jwtToken?: string;
}

export type RevertGrindingOrderResponse = Order;
