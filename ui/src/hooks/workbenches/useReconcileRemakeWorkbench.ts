import { reconcileRemake } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ReconcileRemakeWorkbenchContext {
  workbenchId: string;
}

export const useReconcileRemakeWorkbench = (
  options?: UseMutationOptions<Workbench, HikeError<null>, ReconcileRemakeWorkbenchContext>
) =>
  useMutation({
    mutationKey: ['reconcileRemakeWorkbench'],
    mutationFn: async ({ workbenchId }) => await reconcileRemake(workbenchId),
    ...options
  });
