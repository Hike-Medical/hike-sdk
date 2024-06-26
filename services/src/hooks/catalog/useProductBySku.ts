import { CatalogProductExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findProductBySku } from '../../api/catalog.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseProductBySkuOptions
  extends Omit<UseQueryOptions<CatalogProductExtended, ResponseError<null>>, 'queryKey' | 'queryFn'> {
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
