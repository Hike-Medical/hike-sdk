import { statsForNotification } from '@hike/services';
import { HikeError, NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationStatsOptions
  extends Omit<UseQueryOptions<NotificationStats[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetNotificationStats = ({
  queryKey = [],
  companyIds,
  ...options
}: UseGetNotificationStatsOptions = {}) =>
  useQuery({
    queryKey: ['notificationStats', queryKey],
    queryFn: async () => await statsForNotification(companyIds),
    ...options
  });
