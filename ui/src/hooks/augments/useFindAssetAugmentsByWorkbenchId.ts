import { findAssetAugmentsByWorkbenchId } from '@hike/services';
import { AssetAugmentResult } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentsByWorkbenchId = (
  workbenchId: string,
  options?: Omit<UseQueryOptions<AssetAugmentResult[]>, 'queryKey' | 'queryFn'>
) =>
  useQuery<AssetAugmentResult[]>({
    queryKey: ['augment', 'workbench', workbenchId],
    queryFn: async () => await findAssetAugmentsByWorkbenchId(workbenchId),
    ...options
  });
