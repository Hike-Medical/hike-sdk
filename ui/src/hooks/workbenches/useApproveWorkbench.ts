import { HikeError, approveWorkbench } from '@hike/services';
import { Asset } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ApproveWorkbenchContext {
  workbenchId: string;
}

export const useApproveWorkbench = (options?: UseMutationOptions<Asset[], HikeError<null>, ApproveWorkbenchContext>) =>
  useMutation({
    mutationKey: ['approveWorkbench'],
    mutationFn: async ({ workbenchId }) => await approveWorkbench(workbenchId),
    ...options
  });
