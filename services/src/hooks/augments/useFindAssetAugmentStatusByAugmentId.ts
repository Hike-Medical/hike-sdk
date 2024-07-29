import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAssetAugmentStatusByAugmentId } from '../../api/augment.service';
import { AssetAugmentStatusForAugmentId } from '@hike/types';

export const useFindAssetAugmentStatusByAugmentId = (
  augmentId: string,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentStatusForAugmentId, Error>, 'queryFn' | 'queryKey'>
) => {
  return useQuery({
    queryKey: ['augment', augmentId, 'status'],
    queryFn: async () => await findAssetAugmentStatusByAugmentId(augmentId),
    ...queryOptions
  });
};
