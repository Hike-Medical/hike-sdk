import { AssetStatus, Side } from '../../../prisma';

export interface SubmitRenderParams {
  workbenchId: string;
  side: Side;
  status?: AssetStatus;
}
