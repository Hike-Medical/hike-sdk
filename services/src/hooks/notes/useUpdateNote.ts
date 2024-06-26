import { Notes, UpdateNotesBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateNotesByIdForWorkbench } from '../../api/notes.service';

export interface UpdateNotesParam {
  noteId: string;
  data: UpdateNotesBody;
}

export const useUpdateNotes = (mutationOptions?: UseMutationOptions<Notes, Error, UpdateNotesParam>) =>
  useMutation({
    mutationKey: ['updateNotes'],
    mutationFn: async ({ noteId, data }: UpdateNotesParam) => await updateNotesByIdForWorkbench(noteId, data),
    ...mutationOptions
  });
