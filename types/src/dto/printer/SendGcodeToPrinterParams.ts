import type { Side } from '../../../prisma';

export interface SendGcodeToPrinterParams {
  printerId: string;
  workbenchId: string;
  side: Side;
}
