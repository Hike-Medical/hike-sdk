import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { recoverNoteByIdForWorkbench } from '../../api/notes.service';
import { HikeError } from '../../errors/HikeError';

export const useRecoverNote = (
  noteId: string,
  mutationOptions?: Omit<UseMutationOptions<unknown, HikeError<null>, { noteId: string }>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['recoverNote', noteId],
    mutationFn: async () => await recoverNoteByIdForWorkbench(noteId),
    ...mutationOptions
  });
