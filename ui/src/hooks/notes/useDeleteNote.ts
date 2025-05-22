import { deleteNotesByIdForWorkbench } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export interface DeleteNoteParams {
  noteId: string;
}

export const useDeleteNote = (options?: UseMutationOptions<void, HikeError<null>, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ noteId }) => await deleteNotesByIdForWorkbench(noteId),
    ...options
  });
