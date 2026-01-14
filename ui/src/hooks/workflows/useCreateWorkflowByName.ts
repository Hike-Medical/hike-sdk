import { createWorkflowByName } from '@hike/services';
import type { HikeError, Workflow } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface CreateWorkflowByNameParams {
  workflowName: string;
  parentWorkflowId?: string;
}

export const useCreateWorkflowByName = (
  options?: Omit<UseMutationOptions<Workflow, HikeError<null>, CreateWorkflowByNameParams>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: ({ workflowName, parentWorkflowId }: CreateWorkflowByNameParams) =>
      createWorkflowByName(workflowName, { parentWorkflowId }),
    ...options
  });
