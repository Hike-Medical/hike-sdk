import { findAssetAugmentsByFootId } from '@hike/services';
import { AssetAugment } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentsByFootId = (
  footId: string,
  options?: Omit<UseQueryOptions<AssetAugment[]>, 'queryKey' | 'queryFn'>
) =>
  useQuery<AssetAugment[]>({
    queryKey: ['augment', 'foot', footId],
    queryFn: async () => await findAssetAugmentsByFootId(footId),
    ...options
  });
