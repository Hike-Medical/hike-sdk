import { BillingCode, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ResponseError } from 'errors/ResponseError';
import { fetchBillingCodes, searchBillingCodes } from '../api/billing-code.service';

export interface UseBillingCodesSearchOptions
  extends Omit<UseQueryOptions<PagedResponse<BillingCode[]> | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
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
