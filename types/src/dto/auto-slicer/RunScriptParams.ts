import { PrinterType, Side } from '../../../prisma/index';

export interface RunAutoSlicerParams {
  workbenchId: string;
  side: Side;
  slicerProfile?: string;
  printerType?: PrinterType;
}
