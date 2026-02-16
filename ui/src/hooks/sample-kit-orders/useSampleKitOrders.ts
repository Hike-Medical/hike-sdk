import { fetchSampleKitOrders } from '@hike/services';
import type { GetSampleKitOrdersParams, HikeError, PagedResponse, SampleKitOrderResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSampleKitOrdersOptions
  extends Omit<
    UseQueryOptions<PagedResponse<SampleKitOrderResponse[]>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  params?: GetSampleKitOrdersParams;
  queryKey?: QueryKey;
}

export const useSampleKitOrders = ({ params, queryKey = [], ...options }: UseSampleKitOrdersOptions = {}) =>
  useQuery({
    queryKey: ['sample-kit-orders', params, ...queryKey],
    queryFn: async () => await fetchSampleKitOrders(params),
    ...options
  });
