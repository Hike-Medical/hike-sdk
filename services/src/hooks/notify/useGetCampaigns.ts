import { NotificationExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetCampaignsOptions
  extends Omit<UseQueryOptions<NotificationExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetCampaigns = ({ queryKey = [], ...options }: useGetCampaignsOptions = {}) =>
  useQuery({
    queryKey: ['campaigns', queryKey],
    queryFn: async () => await getCampaigns(),
    ...options
  });
