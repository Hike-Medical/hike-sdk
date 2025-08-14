import { fetchOrthofeetInventoryByProduct } from '@hike/services';
import { GetOrthofeetInventoryResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseOrthofeetInventoryOptions
  extends Omit<UseQueryOptions<GetOrthofeetInventoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  productId: string;
  queryKey?: QueryKey;
}

export const useOrthofeetInventoryByProduct = ({
  productId,
  queryKey = [],
  ...options
}: UseOrthofeetInventoryOptions) =>
  useQuery({
    queryKey: ['orthofeetInventoryByProduct', productId, queryKey],
    queryFn: async () => await fetchOrthofeetInventoryByProduct(productId),
    ...options
  });
