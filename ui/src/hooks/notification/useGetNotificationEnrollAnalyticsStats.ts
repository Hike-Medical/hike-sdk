import { fetchEngagementAnalyticsStats } from '@hike/services';
import { HikeError, NotificationEnrollAnalyticsStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationEnrollAnalyticsStatsOptions
  extends Omit<UseQueryOptions<NotificationEnrollAnalyticsStats, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetNotificationEnrollAnalyticsStats = ({
  queryKey = [],
  ...options
}: UseGetNotificationEnrollAnalyticsStatsOptions = {}) =>
  useQuery({
    queryKey: ['engagementAnalyticsStats', queryKey],
    queryFn: async () => await fetchEngagementAnalyticsStats(),
    ...options
  });
