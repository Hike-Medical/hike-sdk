import { AssetStatus, OrderStatus, WorkbenchStatus } from '@prisma/client';

export interface SearchWorkbenchParams {
  offset?: number;
  status?: WorkbenchStatus;
  assetStatuses?: AssetStatus[];
  orderStatuses?: OrderStatus[];
  workbenchIdPrefix?: string;
}
