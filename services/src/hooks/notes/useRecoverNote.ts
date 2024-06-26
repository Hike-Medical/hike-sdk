import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { recoverNoteByIdForWorkbench } from '../../api/notes.service';

export const useRecoverNote = (
  noteId: string,
  mutationOptions?: Omit<UseMutationOptions<unknown, Error, { noteId: string }>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['recoverNote', noteId],
    mutationFn: async () => await recoverNoteByIdForWorkbench(noteId),
    ...mutationOptions
  });
