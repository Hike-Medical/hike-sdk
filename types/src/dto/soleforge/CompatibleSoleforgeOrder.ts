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
}

export interface CompatibleSoleforgeOrder {
  workbenchId: string;
  orderId: string;
  patientFirstName: string | null;
  patientLastName: string | null;
  poNumber: string | null;
  companySlug: string;
  orderType: 'CLINICAL' | 'CONSUMER';
  orderStatus: OrderStatus;
  orderSide: number | null;
  orderQuantity: string | null;
  printJobs: SoleforgeOrderPrintJob[];
}
