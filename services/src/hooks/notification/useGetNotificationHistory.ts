import { GetNotificationHistoryParams, NotificationHistoryExtended, PagedResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchHistoryByNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetNotificationHistoryOptions
  extends Omit<UseQueryOptions<PagedResponse<NotificationHistoryExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  params: GetNotificationHistoryParams;
  queryKey?: QueryKey;
}

export const useGetNotificationHistory = ({
  notificationId,
  params,
  queryKey = [],
  ...options
}: UseGetNotificationHistoryOptions) =>
  useQuery({
    queryKey: ['notificationHistory', notificationId, params, queryKey],
    queryFn: async () => await fetchHistoryByNotification(notificationId, params),
    ...options
  });
