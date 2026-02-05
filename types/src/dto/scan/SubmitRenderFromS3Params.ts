import { AssetStatus, Side } from '../../../prisma';

export interface SubmitRenderFromS3Params {
  workbenchId: string;
  side: Side;
  filePath: string;
  status?: AssetStatus;
}
