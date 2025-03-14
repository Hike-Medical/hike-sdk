import { PatientWorkbenchResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { patientWorkbenchInformation } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

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
