import { BillingCode, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchBillingCodes } from '../../api/billing-code.service';
import { HikeError } from '../../errors/HikeError';

export interface UseBillingCodesOptions
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
