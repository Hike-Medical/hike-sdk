import { NotifyWebhookInfo } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getWebhookInfo } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetWebhookInfoOptions
  extends Omit<UseQueryOptions<NotifyWebhookInfo[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetWebhookInfo = ({ queryKey = [], ...options }: useGetWebhookInfoOptions = {}) =>
  useQuery({
    queryKey: ['webhookInfo', queryKey],
    queryFn: async () => await getWebhookInfo(),
    ...options
  });
