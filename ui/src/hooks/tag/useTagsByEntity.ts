import { statsForTagEntity } from '@hike/services';
import { EntityType, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseTagsByEntityOptions
  extends Omit<UseQueryOptions<Record<string, number>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  type: EntityType;
  queryKey?: QueryKey;
}

export const useTagsByEntity = ({ type, queryKey = [], ...options }: UseTagsByEntityOptions) =>
  useQuery({
    queryKey: ['tagsByEntity', type, queryKey],
    queryFn: async () => await statsForTagEntity(type),
    ...options
  });
