import type { EvaluationExtended, GetSearchParams, PagedResponse, PatientExtended, SqlQueryParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';
export const searchEvaluations = async (
  params: GetSearchParams
): Promise<{ patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> }> => {
  try {
    const response = await backendApi.get('search', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sqlSearchQuery = async (body: SqlQueryParams): Promise<unknown> => {
  try {
    const response = await backendApi.post('search/sql', body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
