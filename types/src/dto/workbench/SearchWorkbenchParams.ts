import { AssetStatus, OrderStatus, WorkbenchStatus } from '../../../prisma/index';

export interface SearchWorkbenchParams {
  offset?: number;
  status?: WorkbenchStatus;
  assetStatuses?: AssetStatus[];
  orderStatuses?: OrderStatus[];
  workbenchIdPrefix?: string;
}
