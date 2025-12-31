import { bulkAddPrinter3D } from '@hike/services';
import { BulkAddPrinter3DParams, HikeError, Machine, Printer3D } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useBulkAddPrinter3D = (
  options?: UseMutationOptions<(Machine & { printer3Ds: Printer3D[] })[], HikeError<null>, BulkAddPrinter3DParams>
) =>
  useMutation({
    mutationKey: ['bulkAddPrinter3D'],
    mutationFn: async (params) => await bulkAddPrinter3D(params),
    ...options
  });
