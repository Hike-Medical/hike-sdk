import { EvaluationNotes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNotes } from '../api/evaluation.service';

export const useGetNotes = (
  evaluationId: string,
  queryOptions?: UseQueryOptions<Pick<EvaluationNotes, 'id' | 'title' | 'content' | 'tags' | 'createdAt'>[], Error>
) =>
  useQuery({
    queryKey: ['getNotes', evaluationId],
    queryFn: async () => findNotes(evaluationId),
    ...queryOptions
  });
