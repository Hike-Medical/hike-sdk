import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAugmentStatusByWorkbenchId } from '../../api/augment.service';
import { AugmentStatus, AugmentType } from '@hike/types';

export const useFindAugmentStatusByWorkbenchId = (
  workbenchId: string,
  type: AugmentType,
  queryOptions?: Omit<UseQueryOptions<AugmentStatus, Error>, 'queryFn' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['augment', 'status', type],
    queryFn: async () => await findAugmentStatusByWorkbenchId(workbenchId, type),
    ...queryOptions
  });
};
