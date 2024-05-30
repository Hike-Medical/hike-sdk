import { Notes } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ResponseError } from 'errors/ResponseError';
import { findNotes } from '../api/workbench.service';

export interface UseGetNotesOptions
  extends Omit<
    UseQueryOptions<Pick<Notes, 'id' | 'title' | 'content' | 'tags' | 'createdAt'>[] | null, ResponseError<null>>,
    'queryKey' | 'queryFn'
  > {
  workbenchId: string;
  tags?: string[];
  deleted?: boolean;
  queryKey?: QueryKey;
}

export const useGetNotes = ({ workbenchId, tags, deleted = false, queryKey = [], ...options }: UseGetNotesOptions) => {
  const key = ['getNotes', workbenchId, tags, deleted, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findNotes(workbenchId, tags, deleted),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
