import { updateNotesByIdForWorkbench } from '@hike/services';
import { HikeError, Notes, UpdateNotesBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export interface UpdateNotesParam {
  noteId: string;
  data: UpdateNotesBody;
}

export const useUpdateNotes = (options?: UseMutationOptions<Notes, HikeError<null>, UpdateNotesParam>) =>
  useMutation({
    mutationKey: ['updateNotes'],
    mutationFn: async ({ noteId, data }) => await updateNotesByIdForWorkbench(noteId, data),
    ...options
  });
