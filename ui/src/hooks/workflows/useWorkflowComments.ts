import { getWorkflowComments } from '@hike/services';
import type { CommentDto, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UserWorkflowCommentsOptions
  extends Omit<UseQueryOptions<CommentDto[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  queryKey?: QueryKey;
}

export const useWorkflowComments = ({ workflowId, queryKey = [], ...options }: UserWorkflowCommentsOptions) =>
  useQuery({
    queryKey: ['workflowComments', workflowId, queryKey],
    queryFn: async () => await getWorkflowComments(workflowId),
    ...options
  });
