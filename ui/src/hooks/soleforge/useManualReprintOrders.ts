import { getManualReprintOrders } from '@hike/services';
import { GetCompatibleOrdersParams, HikeError, ManualReprintOrdersResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseManualReprintOrdersOptions
  extends Omit<UseQueryOptions<ManualReprintOrdersResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useManualReprintOrders = (
  params?: Pick<GetCompatibleOrdersParams, 'statuses'>,
  options?: UseManualReprintOrdersOptions
) =>
  useQuery<ManualReprintOrdersResponse, HikeError<null>>({
    queryKey: ['manualReprintOrders', params?.statuses, options?.queryKey],
    queryFn: async () => await getManualReprintOrders(params),
    ...options
  });
