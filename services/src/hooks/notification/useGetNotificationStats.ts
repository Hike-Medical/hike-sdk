import { NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationStatsOptions
  extends Omit<UseQueryOptions<NotificationStats[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetNotificationStats = ({
  queryKey = [],
  companyIds,
  ...options
}: useGetNotificationStatsOptions = {}) =>
  useQuery({
    queryKey: ['notificationStats', queryKey],
    queryFn: async () => await statsForNotification(companyIds),
    ...options
  });
