import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotesByIdForWorkbench } from '../../api/notes.service';
import { ResponseError } from '../../errors/ResponseError';

export interface DeleteNoteParams {
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, ResponseError<null>, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ noteId }: DeleteNoteParams) => await deleteNotesByIdForWorkbench(noteId),
    ...mutationOptions
  });
