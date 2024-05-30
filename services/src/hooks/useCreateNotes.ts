import { CreateNotesBody, Notes } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotes } from '../api/workbench.service';

export interface CreateNotesParams {
  evaluationId: string;
  data: CreateNotesBody;
}

export const useCreateNotes = (mutationOptions?: UseMutationOptions<Notes, Error, CreateNotesParams>) =>
  useMutation({
    mutationKey: ['createNotes'],
    mutationFn: async ({ evaluationId, data }: CreateNotesParams) => await createNotes(evaluationId, data),
    ...mutationOptions
  });
