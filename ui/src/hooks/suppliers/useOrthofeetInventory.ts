import { fetchOrthofeetInventory } from '@hike/services';
import { GetOrthofeetInventoryResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseOrthofeetInventoryOptions
  extends Omit<UseQueryOptions<GetOrthofeetInventoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  sku: string | string[];
  queryKey?: QueryKey;
}

export const useOrthofeetInventory = ({ sku, queryKey = [], ...options }: UseOrthofeetInventoryOptions) =>
  useQuery({
    queryKey: ['orthofeetInventory', sku, queryKey],
    queryFn: async () => await fetchOrthofeetInventory(sku),
    ...options
  });
