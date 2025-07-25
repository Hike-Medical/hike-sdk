import { updateFootByWorkbenchId } from '@hike/services';
import { Foot, HikeError, UpdateFootFromWorkbenchId } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateFootFromWorkbenchContext {
  workbenchId: string;
  params: UpdateFootFromWorkbenchId;
}

export const useUpdateFootFromWorkbench = (
  options?: UseMutationOptions<Foot | null, HikeError<null>, UpdateFootFromWorkbenchContext>
) =>
  useMutation({
    mutationKey: ['updateRenderType'],
    mutationFn: async ({ workbenchId, params }) => await updateFootByWorkbenchId(workbenchId, params),
    ...options
  });
