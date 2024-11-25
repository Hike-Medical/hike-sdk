import { Foot, UpdateFootFromWorkbenchId } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateFootByWorkbenchId } from '../../api/foot.service';
import { HikeError } from '../../errors/HikeError';

interface UpdateFootFromWorkbenchContext {
  workbenchId: string;
  params: UpdateFootFromWorkbenchId;
}

export const useUpdateFootFromWorkbench = (
  options?: UseMutationOptions<Foot | null, HikeError<null>, UpdateFootFromWorkbenchContext>
) =>
  useMutation({
    mutationKey: ['updateRenderType'],
    mutationFn: async ({ workbenchId, params }: UpdateFootFromWorkbenchContext) =>
      await updateFootByWorkbenchId(workbenchId, params),
    ...options
  });
