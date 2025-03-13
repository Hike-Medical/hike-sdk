import { NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForNotificationsByPatient } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetNotificationStatsByPatientOptions
  extends Omit<UseQueryOptions<Omit<NotificationStats, 'id' | 'name'>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationStatsByPatient = ({
  queryKey = [],
  patientId,
  ...options
}: UseGetNotificationStatsByPatientOptions) =>
  useQuery({
    queryKey: ['notificationStatsByPatient', patientId, queryKey],
    queryFn: async () => await statsForNotificationsByPatient(patientId),
    ...options
  });
