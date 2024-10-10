import { CampaignWithStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCampaignStats } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetCampaignStatsOptions
  extends Omit<UseQueryOptions<CampaignWithStats, HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  queryKey?: QueryKey;
}

export const useGetCampaignStats = ({ queryKey = [], notificationId, ...options }: useGetCampaignStatsOptions) =>
  useQuery({
    queryKey: ['campaignStats', queryKey],
    queryFn: async () => await getCampaignStats(notificationId),
    ...options
  });
