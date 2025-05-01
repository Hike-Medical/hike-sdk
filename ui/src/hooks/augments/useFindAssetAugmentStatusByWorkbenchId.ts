import { findAssetAugmentStatusByWorkbenchId } from '@hike/services';
import { AssetAugmentStatus, AssetAugmentType } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindAssetAugmentStatusByWorkbenchId = (
  workbenchId: string,
  type: AssetAugmentType,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentStatus, Error>, 'queryFn' | 'queryKey'>
) =>
  useQuery({
    queryKey: ['augment', 'status', type],
    queryFn: async () => await findAssetAugmentStatusByWorkbenchId(workbenchId, type),
    ...queryOptions
  });
