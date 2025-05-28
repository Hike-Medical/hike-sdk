import { fetchBillingCodes } from '@hike/services';
import { BillingCode, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseBillingCodesOptions
  extends Omit<UseQueryOptions<PagedResponse<BillingCode[]> | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  codes: string[];
  queryKey?: QueryKey;
}

export const useBillingCodes = ({ codes, queryKey = [], ...options }: UseBillingCodesOptions) =>
  useQuery({
    queryKey: ['useBillingCodes', codes, queryKey],
    queryFn: async () => await fetchBillingCodes(codes.length ? { codes } : undefined),
    ...options
  });
