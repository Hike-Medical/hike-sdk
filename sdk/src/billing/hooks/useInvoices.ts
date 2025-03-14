import { HikeError } from '@hike/services';
import type { GetStripeInvoiceParams, PagedResponse, StripeInvoiceExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchInvoices } from '../billing.service';

interface UseInvoiceOptions
  extends Omit<UseQueryOptions<PagedResponse<StripeInvoiceExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetStripeInvoiceParams;
  enabled?: boolean;
  queryKey?: QueryKey;
}

export const useInvoices = ({ params, queryKey = [], enabled = true, ...options }: UseInvoiceOptions = {}) =>
  useQuery({
    queryKey: ['invoices', params, queryKey],
    queryFn: async () => await fetchInvoices(params),
    enabled,
    ...options
  });
