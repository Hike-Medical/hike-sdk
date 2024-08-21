import { LegacyOrderResponse } from '../legacy/LegacyOrderResponse';

export interface ShippingLabelResponseByShipmentId {
  legacyOrders: LegacyOrderResponse[];
  trackingURL: string;
  updatedOrders: FlattenedShippingResponse[];
  addressName: string | null;
  estimatedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  shipDate: string | null;
  statusDescription: string;
}

export interface FlattenedShippingResponse {
  firstName: string;
  lastName: string;
  externalId: string;
  poNumber: string;
  companyName: string;
}
