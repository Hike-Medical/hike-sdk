import { findAugmentByAssetIdAndType } from '@hike/services';
import { AssetAugmentResult, AssetAugmentType } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentByIdAndType = (
  assetId: string,
  augmentType: AssetAugmentType,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentResult>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['augment', assetId, augmentType],
    queryFn: async () => await findAugmentByAssetIdAndType(assetId, augmentType),
    ...queryOptions
  });
