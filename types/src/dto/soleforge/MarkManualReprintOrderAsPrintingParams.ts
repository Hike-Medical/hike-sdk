import { Order } from '../../../prisma';

export interface MarkManualReprintOrderAsPrintingParams {
  orderId: string;
  /** Optional JWT token for PIN confirmation */
  jwtToken?: string;
}

export type MarkManualReprintOrderAsPrintingResponse = Order;
