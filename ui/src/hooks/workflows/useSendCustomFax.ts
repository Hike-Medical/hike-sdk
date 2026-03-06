import { sendCustomFax } from '@hike/services';
import type { HikeError, SendCustomFaxParams, SendCustomFaxResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SendCustomFaxVariables {
  workflowId: string;
  params: SendCustomFaxParams;
}

export const useSendCustomFax = (
  options?: UseMutationOptions<SendCustomFaxResponse, HikeError<null>, SendCustomFaxVariables>
) =>
  useMutation({
    mutationKey: ['sendCustomFax'],
    mutationFn: async ({ workflowId, params }) => await sendCustomFax(workflowId, params),
    ...options
  });
