import { NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

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
