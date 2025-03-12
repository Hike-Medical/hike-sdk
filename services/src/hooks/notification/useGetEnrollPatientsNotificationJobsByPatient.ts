import { EnrollPatientsJobData, JobQueueTask } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchEnrollPatientsNotificationJobsByPatientId } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

export interface UseGetEnrollPatientsNotificationJobsByPatientOptions
  extends Omit<UseQueryOptions<JobQueueTask<EnrollPatientsJobData, void>[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const useGetEnrollPatientsNotificationJobsByPatient = ({
  patientId,
  queryKey = [],
  ...options
}: UseGetEnrollPatientsNotificationJobsByPatientOptions) =>
  useQuery({
    queryKey: ['enrollPatientsNotificationJobs', patientId, queryKey],
    queryFn: async () => await fetchEnrollPatientsNotificationJobsByPatientId(patientId),
    ...options
  });
