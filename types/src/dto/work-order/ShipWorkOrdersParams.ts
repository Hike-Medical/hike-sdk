export interface ShipWorkOrdersParams {
  orderIds: string[];
  shippingLabelId?: string;
}

export interface ShipWorkOrdersResult {
  orderId: string;
  poNumber: string | null;
}
