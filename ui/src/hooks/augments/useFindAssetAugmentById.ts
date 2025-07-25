import { findAssetAugmentById } from '@hike/services';
import { AssetAugmentResult } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFindAssetAugmentById = (
  augmentId: string,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentResult>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['augment', augmentId],
    queryFn: async () => await findAssetAugmentById(augmentId),
    ...queryOptions
  });
