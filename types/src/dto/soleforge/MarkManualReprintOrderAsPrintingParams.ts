import { Order } from '../../../prisma';

export interface MarkManualReprintOrderAsPrintingParams {
  orderId: string;
  /** Optional lane ID to assign the order to */
  laneId?: string;
  /** Source of the action for audit logging */
  source?: string;
  /** Optional JWT token for PIN confirmation */
  jwtToken?: string;
}

export type MarkManualReprintOrderAsPrintingResponse = Order;
