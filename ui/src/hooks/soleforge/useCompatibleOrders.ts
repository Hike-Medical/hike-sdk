import { getCompatibleOrders } from '@hike/services';
import { CompatibleSoleforgeOrder, GetCompatibleOrdersParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCompatibleOrdersOptions
  extends Omit<UseQueryOptions<CompatibleSoleforgeOrder[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useCompatibleOrders = (params?: GetCompatibleOrdersParams, options?: UseCompatibleOrdersOptions) =>
  useQuery<CompatibleSoleforgeOrder[], HikeError<null>>({
    queryKey: ['compatibleSoleforgeOrders', params?.statuses, options?.queryKey],
    queryFn: async () => await getCompatibleOrders(params),
    ...options
  });
