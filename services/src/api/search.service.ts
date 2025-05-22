import type { EvaluationExtended, GetSearchParams, PagedResponse, PatientExtended } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const globalSearch = async (
  params: GetSearchParams
): Promise<{ patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> }> => {
  try {
    const response = await backendApi.get('search', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
