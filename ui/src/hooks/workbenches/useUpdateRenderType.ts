import { HikeError, updateRenderType } from '@hike/services';
import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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
