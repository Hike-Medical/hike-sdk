import { getAnalyticsMetadataByEndpoints } from '@hike/services';
import { AnalyticsEndpointName, AnalyticsMetadataByEndpointsResponse, HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetAnalyticsMetadataByEndpoints = (
  endpoints: AnalyticsEndpointName[],
  queryOptions?: Omit<UseQueryOptions<AnalyticsMetadataByEndpointsResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['analyticsMetadataByEndpoints', endpoints],
    queryFn: async () => await getAnalyticsMetadataByEndpoints(endpoints),
    ...queryOptions
  });
