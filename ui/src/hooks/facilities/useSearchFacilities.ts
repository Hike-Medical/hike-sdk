import { searchCompanyFacilityAndAddresses } from '@hike/services';
import type { SearchFacilityParams } from '@hike/types';
import { FacilityExtended, HikeError, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseFacilitySearchOptions extends SearchFacilityParams {
  key?: string[];
  companyIds?: string[];
  enabled?: boolean;
}

export const useSearchFacilities = ({ key = [], enabled = true, companyIds, ...params }: UseFacilitySearchOptions) =>
  useQuery<PagedResponse<FacilityExtended[]>, HikeError<null>>({
    queryKey: ['useFacilitySearch', ...key, params],
    queryFn: async () => await searchCompanyFacilityAndAddresses(params, companyIds),
    enabled
  });
