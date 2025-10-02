import { fetchOrthofeetInventoryBySku } from '@hike/services';
import { GetOrthofeetInventoryResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseOrthofeetInventoryOptions
  extends Omit<UseQueryOptions<GetOrthofeetInventoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  sku: string;
  queryKey?: QueryKey;
}

export const useOrthofeetInventoryBySku = ({ sku, queryKey = [], ...options }: UseOrthofeetInventoryOptions) =>
  useQuery({
    queryKey: ['orthofeetInventoryBySku', sku, queryKey],
    queryFn: async () => await fetchOrthofeetInventoryBySku(sku),
    ...options
  });
