import { ShippingLabel } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPendingShippingLabels } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetPendingLabels
  extends Omit<UseQueryOptions<ShippingLabel[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useGetPendingLabels = ({ queryKey = [], ...options }: useGetPendingLabels) =>
  useQuery<ShippingLabel[], HikeError<null>>({
    queryKey: ['getPendingLabels', queryKey],
    queryFn: async () => await fetchPendingShippingLabels(),
    ...options
  });
