import { updateWorkbenchStatus } from '@hike/services';
import { HikeError, Workbench, WorkbenchStatus } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateWorkbenchStatusContext {
  workbenchId: string;
  status: WorkbenchStatus;
  companyIds?: string[];
}

export const useUpdateWorkbenchStatus = (
  options?: UseMutationOptions<Workbench, HikeError<null>, UpdateWorkbenchStatusContext>
) =>
  useMutation({
    mutationKey: ['updateWorkbenchStatus'],
    mutationFn: async ({ workbenchId, status, companyIds }) =>
      await updateWorkbenchStatus(workbenchId, status, companyIds),
    ...options
  });


