import type { GlobalSearchParams, PagedResponse } from '@hike/types';
import { EvaluationExtended, PatientExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { searchEvaluations } from '../api/search.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseGlobalSearchOptions extends GlobalSearchParams {
  key?: string[];
  enabled?: boolean;
}

export const useGlobalSearch = ({ key = [], enabled = true, ...params }: UseGlobalSearchOptions) =>
  useQuery<
    { patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> },
    ResponseError<null>
  >({
    queryKey: ['evaluationPatientSearch', ...key, params],
    queryFn: async () => await searchEvaluations(params),
    enabled
  });
