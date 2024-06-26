import type { EvaluationExtended, GetSearchParams, PagedResponse, PatientExtended } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const searchEvaluations = async (
  params: GetSearchParams
): Promise<{ patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> }> => {
  try {
    const response = await backendApi.get('search', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
