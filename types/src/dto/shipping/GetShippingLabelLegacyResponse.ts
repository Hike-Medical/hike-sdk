import { LegacyOrderResponse } from '../legacy/LegacyOrderResponse';

export interface ShippingLabelResponseByShipmentId {
  labelPDF: string;
  legacyOrders: LegacyOrderResponse[];
  trackingURL: string;
}
