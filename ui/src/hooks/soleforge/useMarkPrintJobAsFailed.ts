import { markPrintJobAsFailed } from '@hike/services';
import { HikeError, MarkPrintJobAsFailedParams, MarkPrintJobAsFailedResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useMarkPrintJobAsFailed = (
  options?: UseMutationOptions<MarkPrintJobAsFailedResponse, HikeError<null>, MarkPrintJobAsFailedParams>
) =>
  useMutation({
    mutationKey: ['markPrintJobAsFailed'],
    mutationFn: async (params) => await markPrintJobAsFailed(params),
    ...options
  });


