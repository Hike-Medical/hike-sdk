import { GetAggregatedParams } from './GetAggregatedParams';

export interface GetPrintFarmWorkbenchParams extends GetAggregatedParams {
  hideRushedOrders?: boolean;
  prioritizeRushOrders?: boolean;
  prioritizeOutsideClinicOrders?: boolean;
}
