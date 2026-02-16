import type { OrderStatus } from '../../../prisma';
import type { SampleKitFulfillmentType } from './CreateSampleKitOrderParams';

export interface SampleKitOrderResponse {
  id: string;
  workbenchId: string;
  orderId: string;
  evaluationId: string;
  companyId: string;
  companyName: string;
  catalogProductId: string;
  catalogProductSku: string;
  catalogProductName: string;
  fulfillmentType: SampleKitFulfillmentType;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSampleKitOrderResponse {
  evaluationId: string;
  orders: SampleKitOrderResponse[];
}
