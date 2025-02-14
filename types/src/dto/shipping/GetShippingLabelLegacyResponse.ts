export interface ShippingLabelResponseByShipmentId {
  trackingURL: string;
  updatedOrders: FlattenedShippingResponse[];
  addressName: string | null;
  estimatedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  shipDate: string | null;
  statusDescription: string;
  pdfLink: string | null;
}

export interface FlattenedShippingResponse {
  firstName: string;
  lastName: string;
  externalId: string;
  poNumber: string;
  companyName: string;
}
