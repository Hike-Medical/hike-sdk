import { createWorkflowWithFile } from '@hike/services';
import { EvaluationAttachmentType, HikeError, WorkflowDto } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface CreateWorkflowWithFileParams {
  workflowName: string;
  attachment: {
    name: string;
    bucket: string;
    key: string;
    region: string;
    types: EvaluationAttachmentType[];
  };
  externalPatientId?: string;
  externalEvaluationId?: string;
}

export const useCreateWorkflowWithFile = (
  options?: Omit<
    UseMutationOptions<WorkflowDto, HikeError<null>, CreateWorkflowWithFileParams>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['createWorkflowWithFile'],
    mutationFn: (data) => createWorkflowWithFile(data),
    ...options
  });
