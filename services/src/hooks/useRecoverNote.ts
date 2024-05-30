import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { recoverNote } from '../api/workbench.service';

export const useRecoverNote = (
  workbenchId: string,
  noteId: string,
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, { workbenchId: string; noteId: string }>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['recoverNote', workbenchId, noteId],
    mutationFn: async () => await recoverNote(workbenchId, noteId),
    ...mutationOptions
  });
