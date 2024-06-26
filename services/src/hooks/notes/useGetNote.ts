import { Notes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNoteById } from '../../api/notes.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetNote = (
  noteId: string,
  queryOptions?: Omit<UseQueryOptions<Notes, ResponseError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['getNote', noteId],
    queryFn: async () => await findNoteById(noteId),
    ...queryOptions
  });
