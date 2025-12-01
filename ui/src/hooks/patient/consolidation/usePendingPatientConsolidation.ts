import { getPendingPatientConsolidation } from '@hike/services';
import { HikeError, PatientConsolidationCandidate } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UsePendingPatientConsolidationOptions
  extends Omit<UseQueryOptions<PatientConsolidationCandidate | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const usePendingPatientConsolidation = ({
  patientId,
  queryKey = [],
  ...options
}: UsePendingPatientConsolidationOptions) =>
  useQuery({
    queryKey: ['pendingPatientConsolidation', patientId, queryKey],
    queryFn: async () => await getPendingPatientConsolidation(patientId),
    ...options
  });
