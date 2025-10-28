import { fetchNotificationEnrollPatients } from '@hike/services';
import { CompanyPatientExtended, HikeError, PreviewEnrollPatientsParams } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetNotificationEnrollPatientsOptions
  extends Omit<UseQueryOptions<CompanyPatientExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  notificationId: string;
  params: PreviewEnrollPatientsParams;
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
    queryKey: ['notificationEnrollPatients', notificationId, params, limit, queryKey],
    queryFn: async () => await fetchNotificationEnrollPatients(notificationId, params, limit),
    ...options
  });
