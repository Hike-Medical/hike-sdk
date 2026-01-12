import { fetchBillingCodes, searchBillingCodes } from '@hike/services';
import { BillingCode, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseBillingCodesSearchOptions
  extends Omit<UseQueryOptions<PagedResponse<BillingCode[]> | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  searchTerm?: string | null;
  codes?: string[];
  queryKey?: QueryKey;
}

export const useBillingCodesSearch = ({
  searchTerm,
  codes,
  queryKey = [],
  ...options
}: UseBillingCodesSearchOptions) => {
  const key = ['useBillingCodesSearch', ...(searchTerm ? [searchTerm] : []), ...(codes ?? []), ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => {
      if (searchTerm) {
        return await searchBillingCodes({ term: searchTerm });
      }
      return await fetchBillingCodes({ codes: codes ?? [] });
    },
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
