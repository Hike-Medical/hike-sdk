import { PagedParams } from '../PagedParams';

export interface FacilityOrdersOptions extends PagedParams {
  startDate?: string;
  endDate?: string;
  facilityId?: string;
}
