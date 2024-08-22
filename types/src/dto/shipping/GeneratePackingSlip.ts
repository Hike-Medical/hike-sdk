import { ShipTo } from '../shipping/GetShipengineShippingResponse';

export interface GeneratePackingSlip {
  shipTo: ShipTo;
  orders: TrackingOrders[];
  shipmentId: string;
}

interface TrackingOrders {
  poNumber: string;
  patientName: string;
  clinicianName: string;
}
