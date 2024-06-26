import type { MultipleWorkbenchIdsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getFilesFromWorkbenches } from '../../api/workbench.service';

export const useGetMultipleWorkbenchFiles = (
  mutationOptions?: UseMutationOptions<Blob, Error, MultipleWorkbenchIdsParams>
) => {
  return useMutation({
    mutationKey: ['workbenchFiles'],
    mutationFn: (body: MultipleWorkbenchIdsParams) => getFilesFromWorkbenches(body),
    ...mutationOptions
  });
};
