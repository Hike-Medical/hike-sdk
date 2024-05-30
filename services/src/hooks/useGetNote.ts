import { Notes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNoteById } from '../api/workbench.service';

export const useGetNote = (
  workbenchId: string,
  noteId: string,
  queryOptions?: Omit<UseQueryOptions<Notes, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['getNote', workbenchId, noteId],
    queryFn: async () => await findNoteById(workbenchId, noteId),
    ...queryOptions
  });
