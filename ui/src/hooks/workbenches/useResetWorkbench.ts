import { HikeError, resetScans } from '@hike/services';
import { ResetWorkbenchParams, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ResetWorkbenchContext {
  params: ResetWorkbenchParams;
  workbenchId: string;
}

export const useResetWorkbench = (options?: UseMutationOptions<Workbench, HikeError<null>, ResetWorkbenchContext>) =>
  useMutation({
    mutationKey: ['resetWorkbench'],
    mutationFn: async ({ workbenchId, params }) => await resetScans(workbenchId, params),
    ...options
  });
