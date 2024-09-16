import { CatalogProductExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findProductById } from '../../api/catalog.service';
import { HikeError } from '../../errors/HikeError';

export interface UseProductByIdOptions
  extends Omit<UseQueryOptions<CatalogProductExtended, HikeError<null>>, 'queryKey' | 'queryFn'> {
  productId: string;
  queryKey?: QueryKey;
}

export const useProductById = ({ productId, queryKey = [], ...options }: UseProductByIdOptions) => {
  const key = ['useProductById', productId, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findProductById(productId),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
