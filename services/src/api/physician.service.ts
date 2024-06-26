import type { PagedParams, PagedResponse, Physician } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const fetchPhysicians = async (params?: PagedParams): Promise<PagedResponse<Physician[]>> => {
  try {
    const response = await backendApi.get('physician', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const searchPhysicians = async (term: string, params?: PagedParams): Promise<PagedResponse<Physician[]>> => {
  try {
    const response = await backendApi.get('physician/search', { params: { ...params, term } });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
