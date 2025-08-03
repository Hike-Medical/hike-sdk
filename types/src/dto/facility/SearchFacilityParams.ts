import type { PagedParams } from '../PagedParams';

export interface SearchFacilityParams extends PagedParams {
  term: string;
  onlyShippingOrders?: boolean;
  onlyWithAddress?: boolean;
  excludeVendorPays?: boolean;
}
