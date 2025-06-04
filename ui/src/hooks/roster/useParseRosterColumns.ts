import { parseRosterColumns } from '@hike/services';
import type { ParseRosterColumnsParams, ParseRosterColumnsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseParseRosterColumnsOptions
  extends Omit<UseQueryOptions<ParseRosterColumnsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: ParseRosterColumnsParams;
  queryKey?: QueryKey;
}

export const useParseRosterColumns = ({ params, queryKey = [], ...options }: UseParseRosterColumnsOptions) =>
  useQuery({
    queryKey: ['parseRosterColumns', params, queryKey],
    queryFn: async () => await parseRosterColumns(params),
    ...options
  });
