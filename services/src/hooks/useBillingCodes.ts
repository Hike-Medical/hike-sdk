import { BillingCode, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ResponseError } from 'errors/ResponseError';
import { fetchBillingCodes } from '../api/billing-code.service';

export interface UseBillingCodesOptions
  extends Omit<UseQueryOptions<PagedResponse<BillingCode[]> | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  codes: string[];
  queryKey?: QueryKey;
}

export const useBillingCodes = ({ codes, queryKey = [], ...options }: UseBillingCodesOptions) => {
  const key = ['useBillingCodes', codes, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await fetchBillingCodes(codes.length ? { codes } : undefined),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};