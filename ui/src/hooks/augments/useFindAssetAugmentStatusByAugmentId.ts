import { findAssetAugmentStatusByAugmentId } from '@hike/services';
import { AssetAugmentStatusForAugmentId } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentStatusByAugmentId = (
  augmentId: string,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentStatusForAugmentId, Error>, 'queryFn' | 'queryKey'>
) =>
  useQuery({
    queryKey: ['augment', augmentId, 'status'],
    queryFn: async () => await findAssetAugmentStatusByAugmentId(augmentId),
    ...queryOptions
  });
