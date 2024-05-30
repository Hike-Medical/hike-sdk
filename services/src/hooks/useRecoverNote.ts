import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { recoverNote } from '../api/workbench.service';

export const useRecoverNote = (
  evaluationId: string,
  noteId: string,
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, { evaluationId: string; noteId: string }>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['recoverNote', evaluationId, noteId],
    mutationFn: async () => await recoverNote(evaluationId, noteId),
    ...mutationOptions
  });
