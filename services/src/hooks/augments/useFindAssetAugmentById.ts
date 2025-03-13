import { AssetAugmentResult } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findAssetAugmentById } from '../../api/augment.service';

export const useFindAssetAugmentById = (
  augmentId: string,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentResult, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['augment', augmentId],
    queryFn: async () => {
      return await findAssetAugmentById(augmentId);
    },
    ...queryOptions
  });
