import { Side } from '../../../prisma';

export interface RunAutoSlicerParams {
  workbenchId: string;
  side: Side;
  slicerProfile?: string;
}
