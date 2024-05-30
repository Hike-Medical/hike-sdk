import { Notes, UpdateNotesBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateNotes } from '../api/workbench.service';

export interface UpdateNotesParam {
  workbenchId: string;
  noteId: string;
  data: UpdateNotesBody;
}

export const useUpdateNotes = (mutationOptions?: UseMutationOptions<Notes, Error, UpdateNotesParam>) =>
  useMutation({
    mutationKey: ['updateNotes'],
    mutationFn: async ({ workbenchId, noteId, data }: UpdateNotesParam) => await updateNotes(workbenchId, noteId, data),
    ...mutationOptions
  });
