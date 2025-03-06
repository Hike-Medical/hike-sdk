import { NotificationStats } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statsForNotificationsByPatient } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetNotificationStatsByPatientOptions
  extends Omit<UseQueryOptions<Omit<NotificationStats, 'id' | 'name'>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const useGetNotificationStatsByPatient = ({
  queryKey = [],
  patientId,
  ...options
}: useGetNotificationStatsByPatientOptions) =>
  useQuery({
    queryKey: ['notificationStatsByPatient', patientId, queryKey],
    queryFn: async () => await statsForNotificationsByPatient(patientId),
    ...options
  });
