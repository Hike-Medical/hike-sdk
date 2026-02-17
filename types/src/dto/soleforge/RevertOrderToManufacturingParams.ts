import { Order } from '../../../prisma';

export interface RevertOrderToManufacturingParams {
  orderId: string;
  ticketId: string;
  revertReason: string;
  source?: string;
  jwtToken?: string;
}

export type RevertOrderToManufacturingResponse = Order;
