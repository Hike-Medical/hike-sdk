import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotes } from '../api/workbench.service';

export interface DeleteNoteParams {
  evaluationId: string;
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, Error, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: async ({ evaluationId, noteId }: DeleteNoteParams) => await deleteNotes(evaluationId, noteId),
    ...mutationOptions
  });
