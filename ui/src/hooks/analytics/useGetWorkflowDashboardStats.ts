import { getWorkflowDashboardStats } from '@hike/services';
import { HikeError, WorkflowDashboardStats } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetWorkflowDashboardStatsOptions
  extends Omit<UseQueryOptions<WorkflowDashboardStats, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetWorkflowDashboardStats = (queryOptions: UseGetWorkflowDashboardStatsOptions = {}) =>
  useQuery({
    queryKey: ['workflowDashboardStats'],
    queryFn: async () => await getWorkflowDashboardStats(),
    ...queryOptions
  });
