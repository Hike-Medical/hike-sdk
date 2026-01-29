import { updatePrinterNotes } from '@hike/services';
import { HikeError, Printer3D, UpdatePrinterNotesParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdatePrinterNotes = (
  options?: UseMutationOptions<Printer3D, HikeError<null>, UpdatePrinterNotesParams>
) =>
  useMutation({
    mutationKey: ['updatePrinterNotes'],
    mutationFn: async (params) => await updatePrinterNotes(params),
    ...options
  });
