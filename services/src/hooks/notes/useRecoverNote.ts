import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { recoverNoteByIdForWorkbench } from '../../api/notes.service';
import { ResponseError } from '../../errors/ResponseError';

export const useRecoverNote = (
  noteId: string,
  mutationOptions?: Omit<
    UseMutationOptions<unknown, ResponseError<null>, { noteId: string }>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['recoverNote', noteId],
    mutationFn: async () => await recoverNoteByIdForWorkbench(noteId),
    ...mutationOptions
  });
