import { NotificationHistoryMessageExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchNotificationHistoryByPatient } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface UseGetNotificationHistoryByPatientOptions
  extends Omit<UseQueryOptions<NotificationHistoryMessageExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationHistoryByPatient = ({
  patientId,
  queryKey = [],
  ...options
}: UseGetNotificationHistoryByPatientOptions) =>
  useQuery({
    queryKey: ['notificationHistoryByPatient', patientId, queryKey],
    queryFn: async () => await fetchNotificationHistoryByPatient(patientId),
    ...options
  });
