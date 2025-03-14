import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateRenderType } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface UpdateRenderTypeContext {
  workbenchId: string;
  renderType: number;
  companyIds: string[];
}

export const useUpdateRenderType = (
  options?: UseMutationOptions<Workbench, HikeError<null>, UpdateRenderTypeContext>
) =>
  useMutation({
    mutationKey: ['updateRenderType'],
    mutationFn: async ({ workbenchId, renderType, companyIds }) =>
      await updateRenderType(workbenchId, { renderType }, companyIds),
    ...options
  });
