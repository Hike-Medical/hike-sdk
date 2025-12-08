import { getProjectMidnightHammerWorkbenches } from '@hike/services';
import { GetProjectMidnightHammerWorkbenchParams, HikeError, ManufacturingWorkbench, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseProjectMidnightHammerWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<ManufacturingWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetProjectMidnightHammerWorkbenchParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useProjectMidnightHammerWorkbenches = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseProjectMidnightHammerWorkbenchesOptions) =>
  useQuery<PagedResponse<ManufacturingWorkbench[]>, HikeError<null>>({
    queryKey: ['useProjectMidnightHammerWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getProjectMidnightHammerWorkbenches(params, companyIds),
    ...options
  });

