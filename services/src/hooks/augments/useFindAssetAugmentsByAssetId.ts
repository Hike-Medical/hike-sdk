import { AssetAugmentResult } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentsByAssetId = (
  assetId: string,
  options?: Omit<UseQueryOptions<AssetAugmentResult[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<AssetAugmentResult[], Error>({
    queryKey: ['augment', 'asset', assetId],
    queryFn: async () => await useFindAssetAugmentsByAssetId(assetId),
    ...options
  });
};
