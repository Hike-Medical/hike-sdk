import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getFilesFromWorkbenches } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

interface GetMultipleWorkbenchFilesContext {
  workbenchIds: string[];
  companyIds?: string[];
}

export const useGetMultipleWorkbenchFiles = (
  mutationOptions?: UseMutationOptions<Blob, ResponseError<null>, GetMultipleWorkbenchFilesContext>
) => {
  return useMutation({
    mutationKey: ['workbenchFiles'],
    mutationFn: ({ workbenchIds, companyIds }: GetMultipleWorkbenchFilesContext) =>
      getFilesFromWorkbenches(workbenchIds, companyIds),
    ...mutationOptions
  });
};
