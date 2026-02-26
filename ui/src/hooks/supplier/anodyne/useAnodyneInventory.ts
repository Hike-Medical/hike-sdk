import { fetchAnodyneInventory } from '@hike/services';
import { GetAnodyneInventoryResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseAnodyneInventoryOptions
  extends Omit<UseQueryOptions<GetAnodyneInventoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  sku: string | string[];
  queryKey?: QueryKey;
}

export const useAnodyneInventory = ({ sku, queryKey = [], ...options }: UseAnodyneInventoryOptions) =>
  useQuery({
    queryKey: ['anodyneInventory', sku, queryKey],
    queryFn: async () => await fetchAnodyneInventory(sku),
    ...options
  });
