import { GetNotificationsParams, NotificationExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNotifications } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationsOptions
  extends Omit<UseQueryOptions<NotificationExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetNotificationsParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetNotifications = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: useGetNotificationsOptions = {}) =>
  useQuery({
    queryKey: ['notifications', params, companyIds, queryKey],
    queryFn: async () => await findNotifications(params, companyIds),
    ...options
  });
