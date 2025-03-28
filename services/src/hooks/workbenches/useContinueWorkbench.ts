import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { continueWorkbench } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

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
