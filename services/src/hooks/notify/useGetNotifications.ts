import { GetNotificationParams, NotificationExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getNotifications } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationsOptions
  extends Omit<UseQueryOptions<NotificationExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  params?: GetNotificationParams;
  queryKey?: QueryKey;
}

export const useGetNotifications = ({ queryKey = [], params, companyIds, ...options }: useGetNotificationsOptions) =>
  useQuery({
    queryKey: ['campaigns', queryKey, params, companyIds],
    queryFn: async () => await getNotifications(params, companyIds),
    ...options
  });
