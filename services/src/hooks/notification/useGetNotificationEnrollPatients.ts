import { CompanyPatientExtended, EnrollPatientsParams } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchNotificationEnrollPatients } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetNotificationEnrollPatientsOptions
  extends Omit<UseQueryOptions<CompanyPatientExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  params: EnrollPatientsParams;
  limit: number;
  queryKey?: QueryKey;
}

export const useGetNotificationEnrollPatients = ({
  notificationId,
  params,
  limit,
  queryKey = [],
  ...options
}: UseGetNotificationEnrollPatientsOptions) =>
  useQuery({
    queryKey: ['notificationEnrollPatients', notificationId, params, queryKey],
    queryFn: async () => await fetchNotificationEnrollPatients(notificationId, params, limit),
    ...options
  });
