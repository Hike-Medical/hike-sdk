import { CatalogProductExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findProductBySku } from '../../api/catalog.service';
import { HikeError } from '../../errors/HikeError';

interface UseProductBySkuOptions
  extends Omit<UseQueryOptions<CatalogProductExtended, HikeError<null>>, 'queryKey' | 'queryFn'> {
  sku: string;
  queryKey?: QueryKey;
}

export const useProductBySku = ({ sku, queryKey = [], ...options }: UseProductBySkuOptions) => {
  const key = ['useProductBySku', sku, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findProductBySku(sku),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
