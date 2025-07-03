import { getManufacturingWorkbenches } from '@hike/services';
import { GetManufacturingParams, HikeError, PagedResponse, WorkbenchSummary } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseManufacturingWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkbenchSummary[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetManufacturingParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useManufacturingWorkbenches = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseManufacturingWorkbenchesOptions) =>
  useQuery<PagedResponse<WorkbenchSummary[]>, HikeError<null>>({
    queryKey: ['useManufacturingWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getManufacturingWorkbenches(params, companyIds),
    ...options
  });
