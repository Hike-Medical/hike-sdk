import { patientWorkbenchInformation } from '@hike/services';
import { HikeError, PatientWorkbenchResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePatientWorkbenchInformationOptions
  extends Omit<UseQueryOptions<(PatientWorkbenchResponse | null)[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const usePatientWorkbenchInformation = ({
  patientId,
  queryKey = [],
  ...options
}: UsePatientWorkbenchInformationOptions) =>
  useQuery<(PatientWorkbenchResponse | null)[], HikeError<null>>({
    queryKey: ['usePatientWorkbenchInformation', patientId, queryKey],
    queryFn: async () => await patientWorkbenchInformation(patientId),
    ...options
  });
