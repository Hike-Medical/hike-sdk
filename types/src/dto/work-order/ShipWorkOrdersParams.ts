export interface ShipWorkOrdersParams {
  orderIds: string[];
}

export interface ShipWorkOrdersResult {
  orderId: string;
  poNumber: string | null;
}
