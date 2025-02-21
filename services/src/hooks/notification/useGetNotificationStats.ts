import { NotificationWithStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationStatsOptions
  extends Omit<UseQueryOptions<NotificationWithStats, HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetNotificationStats = ({
  queryKey = [],
  notificationId,
  companyIds,
  ...options
}: useGetNotificationStatsOptions) =>
  useQuery({
    queryKey: ['notificationStats', queryKey],
    queryFn: async () => await statsForNotification(notificationId, companyIds),
    ...options
  });
