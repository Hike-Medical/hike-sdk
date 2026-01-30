import { Order } from '../../../prisma';

export interface RevertOrderToPrintingParams {
  orderId: string;
  ticketId: string;
  revertReason: string;
  source?: string;
  jwtToken?: string;
}

export type RevertOrderToPrintingResponse = Order;
