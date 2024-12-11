import { Side } from '../../../prisma';

export interface StreamCompleteParams {
  status: 'SUCCESS' | 'FAILURE';
  fileUrl: string;
  workbenchId?: string;
  footSide?: Side;
}
