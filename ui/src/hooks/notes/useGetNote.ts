import { findNoteById } from '@hike/services';
import { HikeError, Notes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetNote = (
  noteId: string,
  queryOptions?: Omit<UseQueryOptions<Notes, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['getNote', noteId],
    queryFn: async () => await findNoteById(noteId),
    ...queryOptions
  });
