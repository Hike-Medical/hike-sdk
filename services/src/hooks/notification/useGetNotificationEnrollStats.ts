import { EnrollPatientsParams } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForEnrollNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationEnrollStatsOptions
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
}: useGetNotificationEnrollStatsOptions) =>
  useQuery({
    queryKey: ['notificationEnrollStats', notificationId, params, queryKey],
    queryFn: async () => await statsForEnrollNotification(notificationId, params),
    ...options
  });
