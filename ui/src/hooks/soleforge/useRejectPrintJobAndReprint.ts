import { rejectPrintJobAndReprint } from '@hike/services';
import { HikeError, RejectPrintJobAndReprintParams, RejectPrintJobAndReprintResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRejectPrintJobAndReprint = (
  options?: UseMutationOptions<RejectPrintJobAndReprintResponse, HikeError<null>, RejectPrintJobAndReprintParams>
) =>
  useMutation({
    mutationKey: ['rejectPrintJobAndReprint'],
    mutationFn: async (params) => await rejectPrintJobAndReprint(params),
    ...options
  });
