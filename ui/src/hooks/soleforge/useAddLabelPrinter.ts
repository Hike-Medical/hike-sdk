import { addLabelPrinter } from '@hike/services';
import { AddLabelPrinterParams, HikeError, Machine } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddLabelPrinter = (options?: UseMutationOptions<Machine, HikeError<null>, AddLabelPrinterParams>) =>
  useMutation({
    mutationKey: ['addLabelPrinter'],
    mutationFn: async (params) => await addLabelPrinter(params),
    ...options
  });
