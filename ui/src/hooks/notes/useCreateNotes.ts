import { createNotes } from '@hike/services';
import { CreateNotesBody, HikeError, Notes } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export interface CreateNotesParams {
  workbenchId: string;
  data: CreateNotesBody;
}

export const useCreateNotes = (options?: UseMutationOptions<Notes, HikeError<null>, CreateNotesParams>) =>
  useMutation({
    mutationKey: ['createNotes'],
    mutationFn: async ({ workbenchId, data }) => await createNotes(workbenchId, data),
    ...options
  });
