import { EvaluationNotes } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findNoteById } from '../api/evaluation.service';

export const useGetNote = (
  evaluationId: string,
  noteId: string,
  queryOptions?: UseQueryOptions<EvaluationNotes, Error>
) =>
  useQuery({
    queryKey: ['getNote', evaluationId, noteId],
    queryFn: async () => findNoteById(evaluationId, noteId),
    ...queryOptions
  });
