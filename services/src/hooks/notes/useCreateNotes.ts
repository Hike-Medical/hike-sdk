import { CreateNotesBody, Notes } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotes } from '../../api/notes.service';
import { ResponseError } from '../../errors/ResponseError';

export interface CreateNotesParams {
  workbenchId: string;
  data: CreateNotesBody;
}

export const useCreateNotes = (mutationOptions?: UseMutationOptions<Notes, ResponseError<null>, CreateNotesParams>) =>
  useMutation({
    mutationKey: ['createNotes'],
    mutationFn: async ({ workbenchId, data }: CreateNotesParams) => await createNotes(workbenchId, data),
    ...mutationOptions
  });
