import { findAugments } from '@hike/services';
import type { AugmentExtended, GetAugmentsParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAugmentsOptions extends Omit<UseQueryOptions<PagedResponse<AugmentExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetAugmentsParams;
  queryKey?: QueryKey;
}

export const useAugments = ({ params, queryKey = [], ...options }: UseAugmentsOptions = {}) =>
  useQuery({
    queryKey: ['augments', params, queryKey],
    queryFn: async () => await findAugments(params),
    ...options
  });
