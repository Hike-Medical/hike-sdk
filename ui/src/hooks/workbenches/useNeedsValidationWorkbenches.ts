import { getNeedsValidationWorkbenches } from '@hike/services';
import { GetNeedsValidationWorkbenchParams, HikeError, ManufacturingWorkbench, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseNeedsValidationWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<ManufacturingWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetNeedsValidationWorkbenchParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useNeedsValidationWorkbenches = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseNeedsValidationWorkbenchesOptions) =>
  useQuery<PagedResponse<ManufacturingWorkbench[]>, HikeError<null>>({
    queryKey: ['useNeedsValidationWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getNeedsValidationWorkbenches(params, companyIds),
    ...options
  });
