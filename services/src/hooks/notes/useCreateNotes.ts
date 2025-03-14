import { CreateNotesBody, Notes } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotes } from '../../api/notes.service';
import { HikeError } from '../../errors/HikeError';

export interface CreateNotesParams {
  workbenchId: string;
  data: CreateNotesBody;
}

export const useCreateNotes = (mutationOptions?: UseMutationOptions<Notes, HikeError<null>, CreateNotesParams>) =>
  useMutation({
    mutationKey: ['createNotes'],
    mutationFn: async ({ workbenchId, data }) => await createNotes(workbenchId, data),
    ...mutationOptions
  });
