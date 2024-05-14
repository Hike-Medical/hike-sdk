import type { GlobalSearchParams, PagedResponse } from '@hike/types';
import { EvaluationExtended, PatientExtended } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const searchEvaluations = async (
  params: GlobalSearchParams
): Promise<{ patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> }> => {
  const response = await backendApi.get('search', { params });
  return response.data;
};
