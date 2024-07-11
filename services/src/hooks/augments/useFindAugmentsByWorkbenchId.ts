import { AugmentResult } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findAugmentsByWorkbenchId } from '../../api/augment.service';

export const useFindAugmentsByWorkbenchId = (
  workbenchId: string,
  options?: Omit<UseQueryOptions<AugmentResult[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<AugmentResult[], Error>({
    queryKey: ['augment', 'workbench', workbenchId],
    queryFn: async () => await findAugmentsByWorkbenchId(workbenchId),
    ...options
  });
};
