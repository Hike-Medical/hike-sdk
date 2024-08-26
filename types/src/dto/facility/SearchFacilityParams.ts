import type { PagedParams } from '../PagedParams';

export interface SearchFacilityParams extends PagedParams {
  term: string;
  onlyShippingOrders?: boolean;
}
