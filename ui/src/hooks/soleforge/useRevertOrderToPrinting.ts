import { revertOrderToPrinting } from '@hike/services';
import { HikeError, RevertOrderToPrintingParams, RevertOrderToPrintingResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevertOrderToPrinting = (
  options?: UseMutationOptions<RevertOrderToPrintingResponse, HikeError<null>, RevertOrderToPrintingParams>
) =>
  useMutation({
    mutationKey: ['revertOrderToPrinting'],
    mutationFn: async (params) => await revertOrderToPrinting(params),
    ...options
  });
