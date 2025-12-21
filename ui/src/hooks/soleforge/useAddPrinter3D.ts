import { addPrinter3D } from '@hike/services';
import { AddPrinter3DParams, HikeError, Machine, Printer3D } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddPrinter3D = (
  options?: UseMutationOptions<Machine & { printer3Ds: Printer3D[] }, HikeError<null>, AddPrinter3DParams>
) =>
  useMutation({
    mutationKey: ['addPrinter3D'],
    mutationFn: async (params) => await addPrinter3D(params),
    ...options
  });
