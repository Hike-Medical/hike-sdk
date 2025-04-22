import type { Side } from '@prisma/client';

export interface SendGcodeToPrinterParams {
  printerIds: string[];
  workbenchId: string;
  side: Side;
}
