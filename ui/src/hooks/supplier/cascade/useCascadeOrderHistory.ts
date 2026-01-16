import { fetchCascadeOrderHistory } from '@hike/services';
import type { CascadeOrderHistoryResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCascadeOrderHistoryOptions
  extends Omit<UseQueryOptions<CascadeOrderHistoryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  orderNumber: string;
  queryKey?: QueryKey;
}

export const useCascadeOrderHistory = ({ orderNumber, queryKey = [], ...options }: UseCascadeOrderHistoryOptions) =>
  useQuery({
    queryKey: ['cascadeOrderHistory', orderNumber, queryKey],
    queryFn: async () => await fetchCascadeOrderHistory(orderNumber),
    enabled: !!orderNumber,
    ...options
  });
