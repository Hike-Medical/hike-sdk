import { statsForNotificationById } from '@hike/services';
import { HikeError, NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationStatsByIdOptions
  extends Omit<UseQueryOptions<NotificationStats, HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetNotificationStatsById = ({
  queryKey = [],
  notificationId,
  companyIds,
  ...options
}: UseGetNotificationStatsByIdOptions) =>
  useQuery({
    queryKey: ['notificationStatsById', notificationId, queryKey],
    queryFn: async () => await statsForNotificationById(notificationId, companyIds),
    ...options
  });
