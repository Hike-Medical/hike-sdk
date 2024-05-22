import { Notes } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ResponseError } from 'errors/ResponseError';
import { findNotes } from '../api/evaluation.service';

export interface UseGetNotesOptions
  extends Omit<
    UseQueryOptions<Pick<Notes, 'id' | 'title' | 'content' | 'tags' | 'createdAt'>[] | null, ResponseError<null>>,
    'queryKey' | 'queryFn'
  > {
  evaluationId: string;
  tags?: string[];
  deleted?: boolean;
  queryKey?: QueryKey;
}

export const useGetNotes = ({ evaluationId, tags, deleted = false, queryKey = [], ...options }: UseGetNotesOptions) => {
  const key = ['getNotes', evaluationId, tags, deleted, ...queryKey];

  const query = useQuery({
    queryKey: key,
    queryFn: async () => await findNotes(evaluationId, tags, deleted),
    ...options
  });

  return {
    queryKey: key,
    ...query
  };
};
