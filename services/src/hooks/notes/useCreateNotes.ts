import { CreateNotesBody, Notes } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotes } from '../../api/notes.service';

export interface CreateNotesParams {
  workbenchId: string;
  data: CreateNotesBody;
}

export const useCreateNotes = (mutationOptions?: UseMutationOptions<Notes, Error, CreateNotesParams>) =>
  useMutation({
    mutationKey: ['createNotes'],
    mutationFn: async ({ workbenchId, data }: CreateNotesParams) => await createNotes(workbenchId, data),
    ...mutationOptions
  });
