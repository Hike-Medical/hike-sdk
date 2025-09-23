import { getFacilityOrders } from '@hike/services';
import { FacilityOrderAnalyticsResponse, FacilityOrdersOptions, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetFacilityOrdersOptions
  extends Omit<UseQueryOptions<FacilityOrderAnalyticsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params?: FacilityOrdersOptions;
}

export const useGetFacilityOrders = ({ queryKey = [], params, ...options }: UseGetFacilityOrdersOptions = {}) =>
  useQuery({
    queryKey: ['analytics', 'facility-orders', ...queryKey, params],
    queryFn: () => getFacilityOrders(params),
    ...options
  });
