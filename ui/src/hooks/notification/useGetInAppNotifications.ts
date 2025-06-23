import { fetchActiveInAppNotifications } from '@hike/services';
import { HikeError, NotificationExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetInAppNotificationsOptions
  extends Omit<UseQueryOptions<NotificationExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetInAppNotifications = ({
  companyIds,
  queryKey = [],
  ...options
}: UseGetInAppNotificationsOptions = {}) =>
  useQuery({
    queryKey: ['inAppNotifications', companyIds, ...queryKey],
    queryFn: async () => await fetchActiveInAppNotifications(companyIds),
    refetchInterval: 60 * 1000,
    ...options
  });

export default useGetInAppNotifications;
