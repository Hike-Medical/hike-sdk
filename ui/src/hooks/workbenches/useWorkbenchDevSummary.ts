import { getWorkbenchDevSummary } from '@hike/services';
import { GetWorkbenchDevSummaryParams, HikeError, PagedResponse, WorkbenchDevSummary } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkbenchDevSummaryOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkbenchDevSummary[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetWorkbenchDevSummaryParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useWorkbenchDevSummary = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseWorkbenchDevSummaryOptions) =>
  useQuery<PagedResponse<WorkbenchDevSummary[]>, HikeError<null>>({
    queryKey: ['useWorkbenchDevSummary', params, companyIds, queryKey],
    queryFn: async () => await getWorkbenchDevSummary(params, companyIds),
    ...options
  });
