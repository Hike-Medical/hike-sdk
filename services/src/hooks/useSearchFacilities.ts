import type { SearchFacilityParams } from '@hike/types';
import { Facility, FacilityAddress, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { searchCompanyFacilityAndAddresses } from '../api/facility.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFacilitySearchOptions extends SearchFacilityParams {
  key?: string[];
  enabled?: boolean;
}

export const useSearchFacilities = ({ key = [], enabled = true, ...params }: UseFacilitySearchOptions) =>
  useQuery<PagedResponse<(Facility & { address: FacilityAddress })[]>, ResponseError<null>>({
    queryKey: ['useFacilitySearch', ...key, params],
    queryFn: async () => await searchCompanyFacilityAndAddresses(params),
    enabled
  });
