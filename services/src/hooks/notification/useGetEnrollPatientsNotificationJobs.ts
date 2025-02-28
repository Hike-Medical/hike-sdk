import { EnrollPatientsJobData, JobQueueTask } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchEnrollPatientsNotificationJobs } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface UseGetEnrollPatientsNotificationJobsOptions
  extends Omit<UseQueryOptions<JobQueueTask<EnrollPatientsJobData, void>[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetEnrollPatientsNotificationJobs = ({
  queryKey = [],
  ...options
}: UseGetEnrollPatientsNotificationJobsOptions = {}) =>
  useQuery({
    queryKey: ['enrollPatientsNotificationJobs', queryKey],
    queryFn: async () => await fetchEnrollPatientsNotificationJobs(),
    ...options
  });
