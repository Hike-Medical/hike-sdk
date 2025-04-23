import type { Side } from '../../../prisma';

export interface SendGcodeToPrinterParams {
  printerIds: string[];
  workbenchId: string;
  side: Side;
}
