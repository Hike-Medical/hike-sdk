import { recoverNoteByIdForWorkbench } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRecoverNote = (
  noteId: string,
  options?: Omit<UseMutationOptions<unknown, HikeError<null>, { noteId: string }>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['recoverNote', noteId],
    mutationFn: async () => await recoverNoteByIdForWorkbench(noteId),
    ...options
  });
