import { getFilesFromWorkbenches } from '@hike/services';
import { ActionMultipleWorkbenchIdsParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface GetMultipleWorkbenchFilesContext {
  companyIds?: string[];
  params: ActionMultipleWorkbenchIdsParams;
}

export const useGetMultipleWorkbenchFiles = (
  mutationOptions?: UseMutationOptions<Blob, HikeError<null>, GetMultipleWorkbenchFilesContext>
) =>
  useMutation({
    mutationKey: ['workbenchFiles'],
    mutationFn: ({ params, companyIds }) => getFilesFromWorkbenches(params, companyIds),
    ...mutationOptions
  });
