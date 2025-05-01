import { HikeError, recoverNoteByIdForWorkbench } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRecoverNote = (
  noteId: string,
  mutationOptions?: Omit<UseMutationOptions<unknown, HikeError<null>, { noteId: string }>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['recoverNote', noteId],
    mutationFn: async () => await recoverNoteByIdForWorkbench(noteId),
    ...mutationOptions
  });
