import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateRenderType } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

interface UpdateRenderTypeContext {
  workbenchId: string;
  renderType: number;
  companyIds: string[];
}

export const useUpdateRenderType = (
  options?: UseMutationOptions<Workbench, ResponseError<null>, UpdateRenderTypeContext>
) =>
  useMutation({
    mutationKey: ['updateRenderType'],
    mutationFn: async ({ workbenchId, renderType, companyIds }: UpdateRenderTypeContext) =>
      await updateRenderType(workbenchId, { renderType }, companyIds),
    ...options
  });
