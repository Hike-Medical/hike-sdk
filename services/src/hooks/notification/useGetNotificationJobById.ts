import { EnrollPatientsJobData, JobQueueTask } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchNotificationJobById } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

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
