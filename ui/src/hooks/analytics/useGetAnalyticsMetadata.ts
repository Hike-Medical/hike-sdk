import { AnalyticsMetadata, getAnalyticsMetadata } from '@hike/services';
import { HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetAnalyticsMetadata = (
  queryOptions?: Omit<UseQueryOptions<AnalyticsMetadata, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['analyticsMetadata'],
    queryFn: async () => await getAnalyticsMetadata(),
    ...queryOptions
  });
