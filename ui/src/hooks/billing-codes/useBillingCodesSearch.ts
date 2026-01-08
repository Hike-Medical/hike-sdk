import { fetchBillingCodes, searchBillingCodes } from '@hike/services';
import { BillingCode, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseBillingCodesSearchOptions
  extends Omit<UseQueryOptions<PagedResponse<BillingCode[]> | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  searchTerm?: string | null;
  isFavorite?: boolean;
  queryKey?: QueryKey;
}

export const useBillingCodesSearch = ({
  searchTerm,
  isFavorite,
  queryKey = [],
  ...options
}: UseBillingCodesSearchOptions) => {
  const key = [
    'useBillingCodesSearch',
    ...(searchTerm ? [searchTerm] : []),
    ...(isFavorite ? ['favorite'] : []),
    ...queryKey
  ];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => {
      if (searchTerm || isFavorite !== undefined) {
        return await searchBillingCodes({ term: searchTerm ?? '', isFavorite });
      }
      return await fetchBillingCodes();
    },
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
