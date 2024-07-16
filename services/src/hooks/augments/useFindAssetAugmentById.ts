import { AssetAugmentResult } from '@hike/types';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { findAssetAugmentById } from '../../api/augment.service';

export const useFindAssetAugmentById = (augmentId: string, queryOptions?: QueryOptions<AssetAugmentResult, Error>) => {
  return useQuery({
    queryKey: ['augment', augmentId],
    queryFn: async () => {
      return await findAssetAugmentById(augmentId);
    },
    ...queryOptions
  });
};
