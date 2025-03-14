import type { SearchFacilityParams } from '@hike/types';
import { FacilityExtended, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { searchCompanyFacilityAndAddresses } from '../../api/facility.service';
import { HikeError } from '../../errors/HikeError';

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
