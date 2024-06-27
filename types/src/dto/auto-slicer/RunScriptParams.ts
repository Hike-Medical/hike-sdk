import { Side } from '@prisma/client';

export interface RunAutoSlicerParams {
  workbenchId: string;
  side: Side;
  slicerProfile?: string;
}
