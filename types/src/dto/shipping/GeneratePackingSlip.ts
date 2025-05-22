import { ShipTo } from './GetShipengineShippingResponse';

export interface GeneratePackingSlip {
  shipTo: ShipTo;
  orders: TrackingOrders[];
  shipmentId: string;
  trackingNumber: string;
  emailPackingSlips?: string[];
}

interface TrackingOrders {
  poNumber: string;
  patientName: string;
  clinicianName: string;
}
