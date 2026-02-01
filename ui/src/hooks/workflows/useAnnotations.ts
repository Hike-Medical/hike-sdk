import { getAnnotations } from '@hike/services';
import type { AnnotationDto, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAnnotationsParams {
  attachmentId: string;
}

export const useAnnotations = (
  { attachmentId }: UseAnnotationsParams,
  options?: Omit<UseQueryOptions<AnnotationDto[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['annotations', attachmentId],
    queryFn: () => getAnnotations(attachmentId),
    enabled: !!attachmentId,
    ...options
  });
