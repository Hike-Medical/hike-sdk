import type { Side } from '../../../prisma/index';

export interface SendGcodeToPrinterParams {
  printerIds: string[];
  workbenchId: string;
  side: Side;
}
