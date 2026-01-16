import { cancelPrintJob } from '@hike/services';
import { CancelPrintJobParams, CancelPrintJobResponse, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCancelPrintJob = (
  options?: UseMutationOptions<CancelPrintJobResponse, HikeError<null>, CancelPrintJobParams>
) =>
  useMutation({
    mutationKey: ['cancelPrintJob'],
    mutationFn: async (params) => await cancelPrintJob(params),
    ...options
  });
