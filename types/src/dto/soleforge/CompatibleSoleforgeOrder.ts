import { OrderStatus, PrintJobStatus, Side } from '../../../prisma';

export interface SoleforgeOrderPrintJob {
  id: string;
  side: Side | string;
  assetId: string;
  status: PrintJobStatus;
  fileName: string | null;
  laneId: string | null;
  laneName: string | null;
  printerName: string;
  printerId: string;
  actualStartTime: Date | null;
  actualEndTime: Date | null;
  failureReason: string | null;
}

export interface CompatibleSoleforgeOrder {
  workbenchId: string;
  orderId: string;
  patientFirstName: string | null;
  patientLastName: string | null;
  poNumber: string | null;
  companyId: string;
  companySlug: string;
  orderType: 'CLINICAL' | 'CONSUMER';
  orderStatus: OrderStatus;
  orderSide: number | null;
  orderQuantity: string | null;
  committedDeliveryAt: Date | string | null;
  shoeSize: number | null;
  leftQuantity: string | number | null;
  rightQuantity: string | number | null;
  slicerProfile: string | null;
  printJobs: SoleforgeOrderPrintJob[];
}
