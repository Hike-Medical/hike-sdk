import type { GetStripeInvoiceParams, PagedResponse, StripeInvoiceExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchInvoices } from '../../api/billing.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseInvoiceOptions
  extends Omit<UseQueryOptions<PagedResponse<StripeInvoiceExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
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
