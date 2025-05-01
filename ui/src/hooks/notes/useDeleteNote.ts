import { HikeError, deleteNotesByIdForWorkbench } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export interface DeleteNoteParams {
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, HikeError<null>, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ noteId }) => await deleteNotesByIdForWorkbench(noteId),
    ...mutationOptions
  });
