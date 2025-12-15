import { checkPatientDuplicates } from '@hike/services';
import { HikeError, PatientConsolidationCandidate } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseCheckPatientDuplicatesOptions
  extends Omit<UseQueryOptions<PatientConsolidationCandidate[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const useCheckPatientDuplicates = ({ patientId, queryKey = [], ...options }: UseCheckPatientDuplicatesOptions) =>
  useQuery({
    queryKey: ['patientDuplicates', patientId, queryKey],
    queryFn: async () => await checkPatientDuplicates(patientId),
    ...options
  });
