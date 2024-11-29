import type { EvaluationExtended, GetEvaluationsByPatientParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findEvaluationsByPatientId } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export interface UseEvaluationsByPatientOptions
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
    queryKey: ['evaluationsByPatient', params, queryKey],
    queryFn: async () => await findEvaluationsByPatientId(patientId, params),
    ...options
  });
