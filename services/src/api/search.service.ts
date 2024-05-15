import type { EvaluationExtended, GetSearchParams, PagedResponse, PatientExtended } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const searchEvaluations = async (
  params: GetSearchParams
): Promise<{ patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> }> => {
  const response = await backendApi.get('search', { params });
  return response.data;
};
