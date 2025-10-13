import { getNotificationProgress } from '@hike/services';
import { HikeError, NotificationProgress } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationProgressOptions
  extends Omit<UseQueryOptions<NotificationProgress[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationProgress = ({
  queryKey = [],
  notificationId,
  ...options
}: UseGetNotificationProgressOptions) =>
  useQuery({
    queryKey: ['notificationProgress', notificationId, queryKey],
    queryFn: async () => await getNotificationProgress(notificationId),
    ...options
  });
