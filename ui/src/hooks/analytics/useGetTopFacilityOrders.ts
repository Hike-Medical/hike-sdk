import { getTopFacilityOrders } from '@hike/services';
import { FacilityOrderSummaryResponse, FacilityTopOrdersOptions, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetTopFacilityOrdersOptions
  extends Omit<UseQueryOptions<FacilityOrderSummaryResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params?: FacilityTopOrdersOptions;
}

export const useGetTopFacilityOrders = ({ queryKey = [], params, ...options }: UseGetTopFacilityOrdersOptions = {}) =>
  useQuery({
    queryKey: ['analytics', 'top-facility-orders', ...queryKey, params],
    queryFn: () => getTopFacilityOrders(params),
    ...options
  });
