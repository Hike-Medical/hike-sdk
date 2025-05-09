import { HikeError, fetchTags } from '@hike/services';
import { TagResult } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseTagsOptions
  extends Omit<UseQueryOptions<Record<string, TagResult>[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  companyIds?: string[];
}

export const useTags = ({ companyIds, queryKey = [], ...options }: UseTagsOptions = {}) =>
  useQuery({
    queryKey: ['tags', companyIds, queryKey],
    queryFn: async () => await fetchTags(companyIds),
    ...options
  });
