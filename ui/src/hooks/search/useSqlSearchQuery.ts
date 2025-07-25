import { sqlSearchQuery } from '@hike/services';
import { HikeError, SqlQueryParams } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface SqlSearchQueryContext extends Omit<UseQueryOptions<unknown, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params: SqlQueryParams;
  key?: string[];
  enabled?: boolean;
}

export const useSqlSearchQuery = ({ params, enabled, key = [], ...options }: SqlSearchQueryContext) =>
  useQuery({
    queryKey: ['sqlSearchQuery', ...key],
    queryFn: async () => await sqlSearchQuery(params),
    enabled,
    ...options
  });
