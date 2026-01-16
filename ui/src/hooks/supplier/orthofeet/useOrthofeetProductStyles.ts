import { fetchOrthofeetProductStyles } from '@hike/services';
import type { GetOrthofeetProductStylesParams, OrthofeetProductStyle, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrthofeetProductStylesOptions
  extends Omit<UseQueryOptions<PagedResponse<OrthofeetProductStyle[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetOrthofeetProductStylesParams;
  queryKey?: QueryKey;
}

export const useOrthofeetProductStyles = ({ params, queryKey = [], ...options }: UseOrthofeetProductStylesOptions) =>
  useQuery({
    queryKey: ['orthofeetProductStyles', params, queryKey],
    queryFn: async () => await fetchOrthofeetProductStyles(params),
    ...options
  });
