import { getPendingPatientConsolidation } from '@hike/services';
import { HikeError, PatientConsolidationCandidate } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetPendingPatientConsolidationOptions
  extends Omit<UseQueryOptions<PatientConsolidationCandidate | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useGetPendingPatientConsolidation = ({
  patientId,
  queryKey = [],
  enabled = true,
  ...options
}: UseGetPendingPatientConsolidationOptions) =>
  useQuery({
    queryKey: ['pending-patient-consolidation', patientId, queryKey],
    queryFn: async () => await getPendingPatientConsolidation(patientId),
    enabled: enabled && !!patientId,
    ...options
  });

