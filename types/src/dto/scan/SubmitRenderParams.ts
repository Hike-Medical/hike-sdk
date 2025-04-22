import { AssetStatus, Side } from '../../../prisma/index';

export interface SubmitRenderParams {
  workbenchId: string;
  side: Side;
  status?: AssetStatus;
}
