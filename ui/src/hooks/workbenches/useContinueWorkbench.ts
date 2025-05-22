import { continueWorkbench } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface ContinueWorkbenchContext {
  workbenchId: string;
  companyIds: string[];
}

export const useContinueWorkbench = (
  options?: UseMutationOptions<Workbench, HikeError<null>, ContinueWorkbenchContext>
) =>
  useMutation({
    mutationKey: ['continueWorkbench'],
    mutationFn: async ({ workbenchId, companyIds }) => await continueWorkbench(workbenchId, companyIds),
    ...options
  });
