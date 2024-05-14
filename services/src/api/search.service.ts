import type { GlobalSearchParams, GlobalSearchResponse, PagedResponse } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const searchEvaluations = async (params: GlobalSearchParams): Promise<PagedResponse<GlobalSearchResponse[]>> => {
  const response = await backendApi.get('search', { params });
  return response.data;
};
