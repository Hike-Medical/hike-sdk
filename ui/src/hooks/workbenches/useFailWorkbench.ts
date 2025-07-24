import { failWorkbench } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface FailWorkbenchContext {
  workbenchId: string;
  companyIds: string[];
}

export const useFailWorkbench = (options?: UseMutationOptions<Workbench, HikeError<null>, FailWorkbenchContext>) =>
  useMutation({
    mutationKey: ['failWorkbench'],
    mutationFn: async ({ workbenchId, companyIds }) => await failWorkbench(workbenchId, companyIds),
    ...options
  });
