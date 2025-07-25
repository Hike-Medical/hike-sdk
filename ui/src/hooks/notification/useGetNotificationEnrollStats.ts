import { statsForEnrollNotification } from '@hike/services';
import { EnrollPatientsParams, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationEnrollStatsOptions
  extends Omit<UseQueryOptions<{ count: number }, HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  params: EnrollPatientsParams;
  queryKey?: QueryKey;
}

export const useGetNotificationEnrollStats = ({
  notificationId,
  params,
  queryKey = [],
  ...options
}: UseGetNotificationEnrollStatsOptions) =>
  useQuery({
    queryKey: ['notificationEnrollStats', notificationId, params, queryKey],
    queryFn: async () => await statsForEnrollNotification(notificationId, params),
    ...options
  });
