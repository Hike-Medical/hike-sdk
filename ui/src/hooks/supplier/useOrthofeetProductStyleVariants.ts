import { fetchOrthofeetProductStyleVariants } from '@hike/services';
import type { CatalogProductExtended, GetOrthofeetProductStyleVariantsParams } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrthofeetProductStyleVariantsOptions
  extends Omit<UseQueryOptions<CatalogProductExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetOrthofeetProductStyleVariantsParams;
  queryKey?: QueryKey;
}

export const useOrthofeetProductStyleVariants = ({
  params,
  queryKey = [],
  ...options
}: UseOrthofeetProductStyleVariantsOptions) =>
  useQuery({
    queryKey: ['orthofeet-product-style-variants', params, queryKey],
    queryFn: async () => await fetchOrthofeetProductStyleVariants(params),
    ...options
  });
