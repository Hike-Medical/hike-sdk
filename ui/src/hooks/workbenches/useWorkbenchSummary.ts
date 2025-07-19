import { getWorkbenchSummary } from '@hike/services';
import { GetWorkbenchSummaryParams, HikeError, PagedResponse, WorkbenchSummary } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkbenchSummaryOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkbenchSummary[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetWorkbenchSummaryParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useWorkbenchSummary = ({ params, companyIds, queryKey = [], ...options }: UseWorkbenchSummaryOptions) =>
  useQuery<PagedResponse<WorkbenchSummary[]>, HikeError<null>>({
    queryKey: ['useWorkbenchSummary', params, companyIds, queryKey],
    queryFn: async () => await getWorkbenchSummary(params, companyIds),
    ...options
  });
