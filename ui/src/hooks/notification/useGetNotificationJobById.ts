import { fetchNotificationJobById } from '@hike/services';
import { EnrollPatientsJobData, HikeError, JobQueueTask } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationJobByIdOptions
  extends Omit<UseQueryOptions<JobQueueTask<EnrollPatientsJobData, void>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  jobId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationJobById = ({ jobId, queryKey = [], ...options }: UseGetNotificationJobByIdOptions) =>
  useQuery({
    queryKey: ['notificationJobById', jobId, queryKey],
    queryFn: async () => await fetchNotificationJobById(jobId),
    ...options
  });
