import { getManufacturingWorkbenches } from '@hike/services';
import { GetManufacturingWorkbenchParams, HikeError, ManufacturingWorkbench, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseManufacturingWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<ManufacturingWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetManufacturingWorkbenchParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useManufacturingWorkbenches = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseManufacturingWorkbenchesOptions) =>
  useQuery<PagedResponse<ManufacturingWorkbench[]>, HikeError<null>>({
    queryKey: ['useManufacturingWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getManufacturingWorkbenches(params, companyIds),
    ...options
  });
