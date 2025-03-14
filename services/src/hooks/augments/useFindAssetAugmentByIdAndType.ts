import { AssetAugmentResult, AssetAugmentType } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAugmentByAssetIdAndType } from '../../api/augment.service';

export const useFindAssetAugmentByIdAndType = (
  assetId: string,
  augmentType: AssetAugmentType,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentResult, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['augment', assetId, augmentType],
    queryFn: async () => {
      return await findAugmentByAssetIdAndType(assetId, augmentType);
    },
    ...queryOptions
  });
