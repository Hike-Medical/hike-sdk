import { TagResult } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchTags } from '../../api/tag.service';
import { HikeError } from '../../errors/HikeError';
export interface UseTagsOptions
  extends Omit<UseQueryOptions<{ [name: string]: TagResult }[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  companyIds?: string[];
}

export const useTags = ({ companyIds, queryKey = [], ...options }: UseTagsOptions = {}) =>
  useQuery({
    queryKey: ['tags', companyIds, queryKey],
    queryFn: async () => await fetchTags(companyIds),
    ...options
  });
