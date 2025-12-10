import { GetProjectMidnightHammerAnalyticsParams, ProjectMidnightHammerAnalyticsResponse } from '@hike/types';
import { midnightHammerService } from '@hike/services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseProjectMidnightHammerAnalyticsOptions {
  params?: GetProjectMidnightHammerAnalyticsParams;
  enabled?: boolean;
}

export const useProjectMidnightHammerAnalytics = (
  options?: UseProjectMidnightHammerAnalyticsOptions,
  queryOptions?: Omit<UseQueryOptions<ProjectMidnightHammerAnalyticsResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  const { params, enabled = true } = options || {};

  return useQuery<ProjectMidnightHammerAnalyticsResponse, Error>({
    queryKey: ['midnight-hammer-analytics', params],
    queryFn: () => midnightHammerService.getAnalytics(params),
    enabled,
    ...queryOptions
  });
};
