import { AssetStatus, OrderStatus, WorkbenchStatus } from '../../../prisma';

export interface SearchWorkbenchParams {
  offset?: number;
  status?: WorkbenchStatus;
  assetStatuses?: AssetStatus[];
  orderStatuses?: OrderStatus[];
  workbenchIdPrefix?: string;
}
