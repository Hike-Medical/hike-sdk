import { fetchOrthofeetStyleProducts } from '@hike/services';
import type { CatalogProductExtended, GetOrthofeetStyleProductsParams, PagedResponse } from '@hike/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useOrthofeetStyleProducts = (
  options: Omit<UseQueryOptions<PagedResponse<CatalogProductExtended[]>>, 'queryKey' | 'queryFn'> & {
    params: GetOrthofeetStyleProductsParams;
  }
) => {
  return useQuery({
    queryKey: ['orthofeet-style-products', options.params],
    queryFn: () => fetchOrthofeetStyleProducts(options.params),
    enabled: !!options.params.supplierId,
    ...options
  });
};
