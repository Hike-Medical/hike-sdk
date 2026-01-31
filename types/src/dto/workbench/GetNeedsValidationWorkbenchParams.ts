import { GetAggregatedParams } from './GetAggregatedParams';

export interface GetNeedsValidationWorkbenchParams extends GetAggregatedParams {
  prioritizeRushOrders?: boolean;
  /** Filter by whether assets have a taikaId (true = has taikaId, false = no taikaId, undefined = no filter) */
  hasTaikaId?: boolean;
}
