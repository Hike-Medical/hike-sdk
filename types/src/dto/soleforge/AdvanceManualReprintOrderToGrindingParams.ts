import { Order } from '../../../prisma';

export interface AdvanceManualReprintOrderToGrindingParams {
  orderId: string;
  ticketId: string;
  advanceReason: string;
  source?: string;
  /** Optional JWT token for PIN confirmation */
  jwtToken?: string;
}

export type AdvanceManualReprintOrderToGrindingResponse = Order;
