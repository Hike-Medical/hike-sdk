import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotes } from '../api/evaluation.service';

export interface DeleteNoteParams {
  evaluationId: string;
  noteId: string;
}

export const useDeleteNote = (mutationOptions?: UseMutationOptions<void, Error, DeleteNoteParams>) =>
  useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: ({ evaluationId, noteId }: DeleteNoteParams) => deleteNotes(evaluationId, noteId),
    ...mutationOptions
  });
