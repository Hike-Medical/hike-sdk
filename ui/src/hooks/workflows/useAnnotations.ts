import { getAnnotations } from '@hike/services';
import type { AnnotationDto, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAnnotationsParams {
  workflowId: string;
  attachmentId: string;
}

export const useAnnotations = (
  { workflowId, attachmentId }: UseAnnotationsParams,
  options?: Omit<UseQueryOptions<AnnotationDto[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['annotations', workflowId, attachmentId],
    queryFn: () => getAnnotations(workflowId, attachmentId),
    enabled: !!workflowId && !!attachmentId,
    ...options
  });
