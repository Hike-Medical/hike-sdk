import { Notes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNotes } from '../api/evaluation.service';

export const useGetNotes = (
  evaluationId: string,
  tags?: string[],
  queryOptions?: Omit<
    UseQueryOptions<Pick<Notes, 'id' | 'title' | 'content' | 'tags' | 'createdAt'>[], Error>,
    'queryKey' | 'queryFn'
  >,
  deleted: boolean = false
) =>
  useQuery({
    queryKey: ['getNotes', evaluationId, tags, deleted],
    queryFn: async () => await findNotes(evaluationId, tags, deleted),
    ...queryOptions
  });
