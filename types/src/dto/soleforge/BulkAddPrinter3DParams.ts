import { PrinterType } from '../../../prisma';

export interface BulkAddPrinter3DMachine {
  name: string;
  externalId: string;
}

export interface BulkAddPrinter3DParams {
  machines: BulkAddPrinter3DMachine[];
  printerType: PrinterType;
  model: string;
  configurationId: string;
  laneId: string;
}
