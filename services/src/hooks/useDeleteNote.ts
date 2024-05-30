import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotes } from '../api/workbench.service';

export interface DeleteNoteParams {
  workbenchId: string;
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, Error, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ workbenchId, noteId }: DeleteNoteParams) => await deleteNotes(workbenchId, noteId),
    ...mutationOptions
  });
