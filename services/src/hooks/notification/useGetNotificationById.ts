import { NotificationExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchNotificationById } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetNotificationByIdOptions
  extends Omit<UseQueryOptions<NotificationExtended, HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationById = ({ notificationId, queryKey = [], ...options }: UseGetNotificationByIdOptions) =>
  useQuery({
    queryKey: ['notifications', notificationId, queryKey],
    queryFn: async () => await fetchNotificationById(notificationId),
    ...options
  });
