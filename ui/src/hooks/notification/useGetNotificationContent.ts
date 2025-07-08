import { fetchNotificationContent } from '@hike/services';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetNotificationContentOptions
  extends Omit<UseQueryOptions<{ url: string; contentType: string }, HikeError<null>>, 'queryKey' | 'queryFn'> {
  historyId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationContent = ({ historyId, queryKey = [], ...options }: UseGetNotificationContentOptions) =>
  useQuery({
    queryKey: ['notificationContent', historyId, queryKey],
    queryFn: async () => await fetchNotificationContent(historyId),
    ...options
  });
