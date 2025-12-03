import { getEmployerDashboardStats } from '@hike/services';
import { EmployerDashboardStatsOptions, EmployerDashboardStatus, HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetEmployerDashboardStatsOptions
  extends Omit<UseQueryOptions<Record<EmployerDashboardStatus, number>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: EmployerDashboardStatsOptions;
}

export const useGetEmployerDashboardStats = ({ params, ...queryOptions }: UseGetEmployerDashboardStatsOptions = {}) =>
  useQuery({
    queryKey: ['employerDashboardStats', params],
    queryFn: async () => await getEmployerDashboardStats(params),
    ...queryOptions
  });
