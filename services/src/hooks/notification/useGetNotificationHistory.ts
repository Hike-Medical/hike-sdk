import { NotificationHistoryExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchHistoryByNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface UseGetNotificationHistoryOptions
  extends Omit<UseQueryOptions<NotificationHistoryExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationHistory = ({
  notificationId,
  queryKey = [],
  ...options
}: UseGetNotificationHistoryOptions) =>
  useQuery({
    queryKey: ['notificationHistory', notificationId, queryKey],
    queryFn: async () => await fetchHistoryByNotification(notificationId),
    ...options
  });
