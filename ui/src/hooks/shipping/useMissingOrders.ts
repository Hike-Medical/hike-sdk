import { fetchMissingOrders } from '@hike/services';
import { HikeError, MissingOrdersResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseMissingOrders
  extends Omit<UseQueryOptions<MissingOrdersResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useMissingOrders = ({ queryKey = [], ...options }: UseMissingOrders = {}) =>
  useQuery<MissingOrdersResponse, HikeError<null>>({
    queryKey: ['missingOrders', queryKey],
    queryFn: async () => await fetchMissingOrders(),
    ...options
  });
