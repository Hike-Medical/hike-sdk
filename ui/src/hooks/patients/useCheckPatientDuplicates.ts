import { checkPatientDuplicates } from '@hike/services';
import { HikeError, PatientConsolidationCandidate } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseCheckPatientDuplicatesOptions
  extends Omit<UseQueryOptions<PatientConsolidationCandidate[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useCheckPatientDuplicates = ({
  patientId,
  queryKey = [],
  enabled = true,
  ...options
}: UseCheckPatientDuplicatesOptions) =>
  useQuery({
    queryKey: ['patient-duplicates', patientId, queryKey],
    queryFn: async () => await checkPatientDuplicates(patientId),
    enabled: enabled && !!patientId,
    staleTime: 0, // Always fresh - dynamic re-check
    ...options
  });

