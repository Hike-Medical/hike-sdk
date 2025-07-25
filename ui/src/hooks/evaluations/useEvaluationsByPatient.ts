import { findEvaluationsByPatientId } from '@hike/services';
import type { EvaluationExtended, GetEvaluationsByPatientParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseEvaluationsByPatientOptions
  extends Omit<UseQueryOptions<PagedResponse<EvaluationExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  params?: GetEvaluationsByPatientParams;
  queryKey?: QueryKey;
}

export const useEvaluationsByPatient = ({
  patientId,
  params,
  queryKey = [],
  ...options
}: UseEvaluationsByPatientOptions) =>
  useQuery({
    queryKey: ['evaluationsByPatient', patientId, params, queryKey],
    queryFn: async () => await findEvaluationsByPatientId(patientId, params),
    ...options
  });
