import { createWorkflowComment } from '@hike/services';
import type { CreateWorkflowCommentParams, HikeError, CommentDto } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface CreateWorkflowCommentVariables {
  workflowId: string;
  params: CreateWorkflowCommentParams;
}

export const useCreateWorkflowComment = (
  options?: UseMutationOptions<CommentDto, HikeError<null>, CreateWorkflowCommentVariables>
) =>
  useMutation({
    mutationKey: ['createWorkflowNote'],
    mutationFn: async ({ workflowId, params }) => await createWorkflowComment(workflowId, params),
    ...options
  });
