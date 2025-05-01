import { HikeError, rushWorkbench } from '@hike/services';
import { Asset } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface RushWorkbenchContext {
  workbenchId: string;
}

export const useRushWorkbench = (options?: UseMutationOptions<Asset[], HikeError<null>, RushWorkbenchContext>) =>
  useMutation({
    mutationKey: ['rushWorkbench'],
    mutationFn: async ({ workbenchId }) => await rushWorkbench(workbenchId),
    ...options
  });
