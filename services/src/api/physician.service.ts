import type { PagedParams, PagedResponse, Physician } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const fetchPhysicians = async (params?: PagedParams): Promise<PagedResponse<Physician[]>> => {
  const response = await backendApi.get('physician', { params });
  return response.data;
};

export const searchPhysicians = async (term: string, params?: PagedParams): Promise<PagedResponse<Physician[]>> => {
  const response = await backendApi.get('physician/search', { params: { ...params, term } });
  return response.data;
};
