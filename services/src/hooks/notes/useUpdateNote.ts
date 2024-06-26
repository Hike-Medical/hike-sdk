import { Notes, UpdateNotesBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateNotesByIdForWorkbench } from '../../api/notes.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UpdateNotesParam {
  noteId: string;
  data: UpdateNotesBody;
}

export const useUpdateNotes = (mutationOptions?: UseMutationOptions<Notes, ResponseError<null>, UpdateNotesParam>) =>
  useMutation({
    mutationKey: ['updateNotes'],
    mutationFn: async ({ noteId, data }: UpdateNotesParam) => await updateNotesByIdForWorkbench(noteId, data),
    ...mutationOptions
  });
