import { GetAggregatedParams } from './GetAggregatedParams';

export interface GetStationsParams extends GetAggregatedParams {
  excludeDestinationFacility?: boolean;
}
