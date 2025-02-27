import { NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForNotificationById } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationStatsByIdOptions
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
}: useGetNotificationStatsByIdOptions) =>
  useQuery({
    queryKey: ['notificationStatsById', notificationId, queryKey],
    queryFn: async () => await statsForNotificationById(notificationId, companyIds),
    ...options
  });
