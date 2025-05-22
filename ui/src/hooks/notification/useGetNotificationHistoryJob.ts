import { fetchNotificationHistoryByJob } from '@hike/services';
import { HikeError, NotificationHistoryExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationHistoryJobOptions
  extends Omit<UseQueryOptions<NotificationHistoryExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  jobId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationHistoryJob = ({
  jobId,
  queryKey = [],
  ...options
}: UseGetNotificationHistoryJobOptions) =>
  useQuery({
    queryKey: ['notificationHistoryJob', jobId, queryKey],
    queryFn: async () => await fetchNotificationHistoryByJob(jobId),
    ...options
  });
