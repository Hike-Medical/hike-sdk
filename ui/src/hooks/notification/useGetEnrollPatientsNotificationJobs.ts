import { fetchEnrollPatientsNotificationJobs } from '@hike/services';
import {
  EnrollPatientsJobData,
  GetEnrollPatientsNotificationJobsParams,
  HikeError,
  JobQueueTask,
  PagedResponse
} from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetEnrollPatientsNotificationJobsOptions
  extends Omit<
    UseQueryOptions<PagedResponse<JobQueueTask<EnrollPatientsJobData, void>[]>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  params?: GetEnrollPatientsNotificationJobsParams;
  queryKey?: QueryKey;
}

export const useGetEnrollPatientsNotificationJobs = ({
  params,
  queryKey = [],
  ...options
}: UseGetEnrollPatientsNotificationJobsOptions = {}) =>
  useQuery({
    queryKey: ['enrollPatientsNotificationJobs', params, queryKey],
    queryFn: async () => await fetchEnrollPatientsNotificationJobs(params),
    ...options
  });
