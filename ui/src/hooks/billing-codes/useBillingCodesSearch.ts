import { HikeError, fetchBillingCodes, searchBillingCodes } from '@hike/services';
import { BillingCode, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseBillingCodesSearchOptions
  extends Omit<UseQueryOptions<PagedResponse<BillingCode[]> | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  searchTerm?: string | null;
  queryKey?: QueryKey;
}

export const useBillingCodesSearch = ({ searchTerm, queryKey = [], ...options }: UseBillingCodesSearchOptions) => {
  const key = ['useBillingCodesSearch', ...(searchTerm ? [searchTerm] : []), ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => (searchTerm ? await searchBillingCodes({ term: searchTerm }) : await fetchBillingCodes()),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
