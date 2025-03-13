import { AssetAugment } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAssetAugmentsByFootId } from '../../api/augment.service';

export const useFindAssetAugmentsByFootId = (
  footId: string,
  options?: Omit<UseQueryOptions<AssetAugment[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery<AssetAugment[], Error>({
    queryKey: ['augment', 'foot', footId],
    queryFn: async () => await findAssetAugmentsByFootId(footId),
    ...options
  });
