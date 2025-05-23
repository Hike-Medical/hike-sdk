import type { GetStripeInvoiceParams, HikeError, PagedResponse, StripeInvoiceExtended } from '@hike/sdk';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchInvoices } from '../api/billing.service';

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
