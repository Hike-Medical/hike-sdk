import { searchAttachments } from '@hike/services';
import type { HikeError, PagedResponse, SearchAttachmentsParams, WorkflowAttachment } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useSearchAttachments = (
  params: SearchAttachmentsParams,
  options?: Omit<UseQueryOptions<PagedResponse<WorkflowAttachment[]>, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['search-attachments', params],
    queryFn: () => searchAttachments(params),
    ...options
  });
