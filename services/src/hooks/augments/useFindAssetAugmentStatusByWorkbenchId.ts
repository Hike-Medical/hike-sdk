import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAssetAugmentStatusByWorkbenchId } from '../../api/augment.service';
import { AssetAugmentStatus, AssetAugmentType } from '@hike/types';

export const useFindAssetAugmentStatusByWorkbenchId = (
  workbenchId: string,
  type: AssetAugmentType,
  queryOptions?: Omit<UseQueryOptions<AssetAugmentStatus, Error>, 'queryFn' | 'queryKey'>
) => {
  return useQuery({
    queryKey: ['augment', 'status', type],
    queryFn: async () => await findAssetAugmentStatusByWorkbenchId(workbenchId, type),
    ...queryOptions
  });
};
