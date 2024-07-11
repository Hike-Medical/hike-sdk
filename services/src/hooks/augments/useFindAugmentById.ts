import { AugmentResult } from '@hike/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { findAugmentById } from '../../api/augment.service';

export const useFindAugmentById = (augmentId: string, queryOptions?: QueryOptions<AugmentResult, Error>) => {
  return useQuery({
    queryKey: ['augment', augmentId],
    queryFn: async () => {
      return await findAugmentById(augmentId);
    },
    ...queryOptions
  });
};
