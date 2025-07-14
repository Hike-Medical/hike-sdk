import { fetchOrthofeetInventory } from '@hike/services';
import { GetOrthofeetInventoryResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseOrthofeetInventoryOptions
  extends Omit<UseQueryOptions<GetOrthofeetInventoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  partNumber: string | string[];
  queryKey?: QueryKey;
}

export const useOrthofeetInventory = ({ partNumber, queryKey = [], ...options }: UseOrthofeetInventoryOptions) =>
  useQuery({
    queryKey: ['orthofeetInventory', partNumber, queryKey],
    queryFn: async () => await fetchOrthofeetInventory(partNumber),
    ...options
  });
