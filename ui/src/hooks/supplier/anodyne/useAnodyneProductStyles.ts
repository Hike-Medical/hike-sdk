import { fetchAnodyneProductStyles } from '@hike/services';
import type { AnodyneProductStyle, GetAnodyneProductStylesParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAnodyneProductStylesOptions
  extends Omit<UseQueryOptions<PagedResponse<AnodyneProductStyle[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetAnodyneProductStylesParams;
  queryKey?: QueryKey;
}

export const useAnodyneProductStyles = ({ params, queryKey = [], ...options }: UseAnodyneProductStylesOptions) =>
  useQuery({
    queryKey: ['anodyneProductStyles', params, queryKey],
    queryFn: async () => await fetchAnodyneProductStyles(params),
    ...options
  });
