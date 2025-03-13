import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotesByIdForWorkbench } from '../../api/notes.service';
import { HikeError } from '../../errors/HikeError';

export interface DeleteNoteParams {
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, HikeError<null>, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ noteId }) => await deleteNotesByIdForWorkbench(noteId),
    ...mutationOptions
  });
