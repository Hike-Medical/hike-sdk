import { getAnalyticsByName } from '@hike/services';
import { AnalyticsDateRangeParams, AnalyticsEndpointName, HikeError, OrdersByCompaniesResponse } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetAnalyticsByName = (
  name: AnalyticsEndpointName,
  params: AnalyticsDateRangeParams,
  companyIds: string[],
  queryOptions?: Omit<UseQueryOptions<OrdersByCompaniesResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['analyticsByName', name, params, companyIds],
    queryFn: async () => await getAnalyticsByName(name, params, companyIds),
    ...queryOptions
  });
