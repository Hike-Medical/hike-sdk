import { fetchEngagementAnalytics } from '@hike/services';
import {
  HikeError,
  NotificationEnrollAnalyticsParams,
  NotificationEnrollAnalyticsRow,
  PagedResponse
} from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationEnrollAnalyticsOptions
  extends Omit<UseQueryOptions<PagedResponse<NotificationEnrollAnalyticsRow[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: NotificationEnrollAnalyticsParams;
  queryKey?: QueryKey;
}

export const useGetNotificationEnrollAnalytics = ({
  params,
  queryKey = [],
  ...options
}: UseGetNotificationEnrollAnalyticsOptions) =>
  useQuery({
    queryKey: ['engagementAnalytics', params, queryKey],
    queryFn: async () => await fetchEngagementAnalytics(params),
    ...options
  });
