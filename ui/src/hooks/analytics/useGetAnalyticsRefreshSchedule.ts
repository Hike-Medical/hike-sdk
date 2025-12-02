import { getAnalyticsRefreshSchedule } from '@hike/services';
import { AnalyticsRefreshSchedule, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetAnalyticsRefreshScheduleOptions
  extends Omit<UseQueryOptions<AnalyticsRefreshSchedule, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

/**
 * Hook to fetch the analytics refresh schedule.
 * Shows when analytics data was last refreshed and when the next refresh is scheduled.
 */
export const useGetAnalyticsRefreshSchedule = ({
  queryKey = [],
  ...options
}: UseGetAnalyticsRefreshScheduleOptions = {}) =>
  useQuery({
    queryKey: ['analyticsRefreshSchedule', ...queryKey],
    queryFn: async () => await getAnalyticsRefreshSchedule(),
    // Refetch every 5 minutes to keep the schedule up to date
    refetchInterval: 5 * 60 * 1000,
    ...options
  });

