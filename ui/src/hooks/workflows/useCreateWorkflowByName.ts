import { createWorkflowByName, StartWorkflowParams } from '@hike/services';
import type { HikeError, Workflow } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseCreateWorkflowByNameParams {
  workflowName: string;
  params?: StartWorkflowParams;
}

export const useCreateWorkflowByName = (
  options?: Omit<UseMutationOptions<Workflow, HikeError<null>, UseCreateWorkflowByNameParams>, 'mutationFn'>
) =>
  useMutation({
    mutationFn: ({ workflowName, params }: UseCreateWorkflowByNameParams) => createWorkflowByName(workflowName, params),

    ...options
  });
