import { Notes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNotes } from '../api/evaluation.service';

export const useGetNotes = (
  evaluationId: string,
  tags?: string[],
  queryOptions?: Omit<
    UseQueryOptions<Pick<Notes, 'id' | 'title' | 'content' | 'tags' | 'createdAt'>[], Error>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['getNotes', evaluationId, tags],
    queryFn: async () => findNotes(evaluationId, tags),
    ...queryOptions
  });
