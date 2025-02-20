import { GetNotificationParams, NotificationExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetCampaignsOptions
  extends Omit<UseQueryOptions<NotificationExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  params?: GetNotificationParams;
  queryKey?: QueryKey;
}

export const useGetCampaigns = ({ queryKey = [], params, companyIds, ...options }: useGetCampaignsOptions) =>
  useQuery({
    queryKey: ['campaigns', queryKey, params, companyIds],
    queryFn: async () => await getCampaigns(params, companyIds),
    ...options
  });
