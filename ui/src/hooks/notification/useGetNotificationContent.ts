import { fetchNotificationContent } from '@hike/services';
import { HikeError, PresignedFile } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetNotificationContentOptions
  extends Omit<UseQueryOptions<PresignedFile, HikeError<null>>, 'queryKey' | 'queryFn'> {
  historyId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationContent = ({ historyId, queryKey = [], ...options }: UseGetNotificationContentOptions) =>
  useQuery({
    queryKey: ['notificationContent', historyId, queryKey],
    queryFn: async () => await fetchNotificationContent(historyId),
    ...options
  });
