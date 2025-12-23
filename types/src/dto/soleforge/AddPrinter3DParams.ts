import { PrinterType } from '../../../prisma';

export interface AddPrinter3DParams {
  name: string;
  printerType: PrinterType;
  externalId: string;
  configurationId: string;
  laneId?: string;
  model?: string;
}
