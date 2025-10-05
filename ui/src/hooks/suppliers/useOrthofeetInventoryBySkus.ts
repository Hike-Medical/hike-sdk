import { fetchOrthofeetInventoryBySkus } from '@hike/services';
import { GetOrthofeetInventoryResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseOrthofeetInventoryOptions
  extends Omit<UseQueryOptions<GetOrthofeetInventoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  skus: string[];
  queryKey?: QueryKey;
}

export const useOrthofeetInventoryBySkus = ({ skus, queryKey = [], ...options }: UseOrthofeetInventoryOptions) =>
  useQuery({
    queryKey: ['orthofeetInventoryBySkus', skus, queryKey],
    queryFn: async () => await fetchOrthofeetInventoryBySkus(skus),
    ...options
  });
