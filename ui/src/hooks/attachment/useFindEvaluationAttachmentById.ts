import { findEvaluationAttachmentById } from '@hike/services';
import { EvaluationAttachmentExtended, HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFindEvaluationAttachmentById = (
  evaluationId: string,
  options?: Omit<UseQueryOptions<EvaluationAttachmentExtended, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['findEvaluationAttachmentById', evaluationId],
    queryFn: async () => await findEvaluationAttachmentById(evaluationId),
    ...options
  });
