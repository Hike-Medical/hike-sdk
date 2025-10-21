import { fetchOrthofeetStyleVariants } from '@hike/services';
import type { CatalogProductExtended, GetOrthofeetStyleVariantsParams } from '@hike/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useOrthofeetStyleVariants = (
  options: Omit<UseQueryOptions<CatalogProductExtended[]>, 'queryKey' | 'queryFn'> & {
    params: GetOrthofeetStyleVariantsParams;
  }
) => {
  return useQuery({
    queryKey: ['orthofeet-style-variants', options.params],
    queryFn: () => fetchOrthofeetStyleVariants(options.params),
    enabled: !!options.params.supplierId && !!options.params.styleNameValue,
    ...options
  });
};
