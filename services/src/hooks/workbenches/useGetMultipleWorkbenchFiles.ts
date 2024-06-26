import type { MultipleWorkbenchIdsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getFilesFromWorkbenches } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetMultipleWorkbenchFiles = (
  mutationOptions?: UseMutationOptions<Blob, ResponseError<null>, MultipleWorkbenchIdsParams>
) => {
  return useMutation({
    mutationKey: ['workbenchFiles'],
    mutationFn: (body: MultipleWorkbenchIdsParams, companyIds?: string[]) => getFilesFromWorkbenches(body, companyIds),
    ...mutationOptions
  });
};
