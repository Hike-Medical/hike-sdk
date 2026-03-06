import { renderFaxTemplate } from '@hike/services';
import type { HikeError, RenderFaxTemplateParams, RenderFaxTemplateResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface RenderFaxTemplateVariables {
  workflowId: string;
  params: RenderFaxTemplateParams;
}

export const useRenderFaxTemplate = (
  options?: UseMutationOptions<RenderFaxTemplateResponse, HikeError<null>, RenderFaxTemplateVariables>
) =>
  useMutation({
    mutationKey: ['renderFaxTemplate'],
    mutationFn: async ({ workflowId, params }) => await renderFaxTemplate(workflowId, params),
    ...options
  });
