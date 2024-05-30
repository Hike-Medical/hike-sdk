import { Notes, UpdateNotesBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateNotes } from '../api/workbench.service';

export interface UpdateNotesParam {
  evaluationId: string;
  noteId: string;
  data: UpdateNotesBody;
}

export const useUpdateNotes = (mutationOptions?: UseMutationOptions<Notes, Error, UpdateNotesParam>) =>
  useMutation({
    mutationKey: ['updateNotes'],
    mutationFn: async ({ evaluationId, noteId, data }: UpdateNotesParam) =>
      await updateNotes(evaluationId, noteId, data),
    ...mutationOptions
  });
