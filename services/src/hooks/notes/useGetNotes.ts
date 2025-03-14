import { Notes } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNotesByWorkbenchId } from '../../api/notes.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetNotesOptions extends Omit<UseQueryOptions<Notes[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  tags?: string[];
  deleted?: boolean;
  queryKey?: QueryKey;
}

export const useGetNotes = ({ workbenchId, tags, deleted = false, queryKey = [], ...options }: UseGetNotesOptions) => {
  const key = ['getNotes', workbenchId, tags, deleted, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findNotesByWorkbenchId(workbenchId, tags, deleted),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
