import { getWorkbenchComplete } from '@hike/services';
import { HikeError, WorkbenchExtended } from '@hike/types';
import { QueryKey, UseMutationOptions, useMutation } from '@tanstack/react-query';

interface Variables {
  workbenchId: string;
}

interface UseGetWorkbenchMutationOptions
  extends Omit<UseMutationOptions<WorkbenchExtended, HikeError<null>, Variables>, 'mutationFn' | 'mutationKey'> {
  mutationKey?: QueryKey;
}

export const useGetWorkbenchMutation = ({ mutationKey = [], ...options }: UseGetWorkbenchMutationOptions = {}) =>
  useMutation<WorkbenchExtended, HikeError<null>, Variables>({
    mutationKey: ['workbenchId', ...mutationKey],
    mutationFn: async ({ workbenchId }) => getWorkbenchComplete(workbenchId),
    ...options
  });
