import { PrinterType, Side } from '../../../prisma';

export interface RunAutoSlicerParams {
  workbenchId: string;
  side: Side;
  slicerProfile?: string;
  printerType?: PrinterType;
}
