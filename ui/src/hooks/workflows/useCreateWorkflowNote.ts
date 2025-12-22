import { createWorkflowNote } from '@hike/services';
import type { CreateWorkflowNoteParams, HikeError, WorkflowNote } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface CreateWorkflowNoteVariables {
  workflowId: string;
  params: CreateWorkflowNoteParams;
}

export const useCreateWorkflowNote = (
  options?: UseMutationOptions<WorkflowNote, HikeError<null>, CreateWorkflowNoteVariables>
) =>
  useMutation({
    mutationKey: ['createWorkflowNote'],
    mutationFn: async ({ workflowId, params }) => await createWorkflowNote(workflowId, params),
    ...options
  });
