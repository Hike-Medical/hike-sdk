import { Notes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNoteById } from '../api/evaluation.service';

export const useGetNote = (
  evaluationId: string,
  noteId: string,
  queryOptions?: Omit<UseQueryOptions<Notes, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['getNote', evaluationId, noteId],
    queryFn: async () => await findNoteById(evaluationId, noteId),
    ...queryOptions
  });
