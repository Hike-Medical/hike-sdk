import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotesByIdForWorkbench } from '../api/notes.service';

export interface DeleteNoteParams {
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, Error, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ noteId }: DeleteNoteParams) => await deleteNotesByIdForWorkbench(noteId),
    ...mutationOptions
  });
