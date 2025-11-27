import { getOrdersExtended } from '@hike/services';
import { GetOrdersExtendedParams, HikeError, OrderExtended, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrdersExtendedOptions
  extends Omit<UseQueryOptions<PagedResponse<OrderExtended[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetOrdersExtendedParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useOrdersExtended = ({ params, companyIds, queryKey = [], ...options }: UseOrdersExtendedOptions = {}) =>
  useQuery<PagedResponse<OrderExtended[]>, HikeError<null>>({
    queryKey: ['useOrdersExtended', params, companyIds, queryKey],
    queryFn: async () => await getOrdersExtended(params, companyIds),
    ...options
  });

