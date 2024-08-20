import { ShippingLabel } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPendingShippingLabels } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useGetPendingLabels
  extends Omit<UseQueryOptions<ShippingLabel[], ResponseError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useGetPendingLabels = ({ queryKey = [], ...options }: useGetPendingLabels) =>
  useQuery<ShippingLabel[], ResponseError<null>>({
    queryKey: ['getPendingLabels', queryKey],
    queryFn: async () => await fetchPendingShippingLabels(),
    ...options
  });
