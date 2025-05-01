import { findAssetAugmentsByFootId } from '@hike/services';
import { AssetAugment } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentsByFootId = (
  footId: string,
  options?: Omit<UseQueryOptions<AssetAugment[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery<AssetAugment[], Error>({
    queryKey: ['augment', 'foot', footId],
    queryFn: async () => await findAssetAugmentsByFootId(footId),
    ...options
  });
