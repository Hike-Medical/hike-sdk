import { bulkMarkPrintJobsAsFailed } from '@hike/services';
import { BulkMarkPrintJobsAsFailedParams, BulkMarkPrintJobsAsFailedResponse, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useBulkMarkPrintJobsAsFailed = (
  options?: UseMutationOptions<BulkMarkPrintJobsAsFailedResponse, HikeError<null>, BulkMarkPrintJobsAsFailedParams>
) =>
  useMutation({
    mutationKey: ['bulkMarkPrintJobsAsFailed'],
    mutationFn: async (params) => await bulkMarkPrintJobsAsFailed(params),
    ...options
  });
