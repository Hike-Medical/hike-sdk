import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getFilesFromWorkbenches } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface GetMultipleWorkbenchFilesContext {
  workbenchIds: string[];
  withLabel: boolean;
  companyIds?: string[];
}

export const useGetMultipleWorkbenchFiles = (
  mutationOptions?: UseMutationOptions<Blob, HikeError<null>, GetMultipleWorkbenchFilesContext>
) => {
  return useMutation({
    mutationKey: ['workbenchFiles'],
    mutationFn: ({ workbenchIds, withLabel, companyIds }: GetMultipleWorkbenchFilesContext) =>
      getFilesFromWorkbenches(workbenchIds, withLabel, companyIds),
    ...mutationOptions
  });
};
