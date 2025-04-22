import { AssetStatus, Side } from '@prisma/client';

export interface SubmitRenderParams {
  workbenchId: string;
  side: Side;
  status?: AssetStatus;
}
