import { AssetAugmentResult } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAssetAugmentsByWorkbenchId } from '../../api/augment.service';

export const useFindAssetAugmentsByWorkbenchId = (
  workbenchId: string,
  options?: Omit<UseQueryOptions<AssetAugmentResult[], Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery<AssetAugmentResult[], Error>({
    queryKey: ['augment', 'workbench', workbenchId],
    queryFn: async () => await findAssetAugmentsByWorkbenchId(workbenchId),
    ...options
  });
