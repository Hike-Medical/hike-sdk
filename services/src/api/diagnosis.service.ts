import type { Diagnosis, PagedParams, PagedResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findDiagnosisByCode = async (code: string): Promise<Diagnosis> => {
  try {
    const response = await backendApi.get(`diagnosis/${code}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchDiagnoses = async (params?: PagedParams): Promise<PagedResponse<Diagnosis[]>> => {
  try {
    const response = await backendApi.get('diagnosis', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchDiagnoses = async (term: string, params?: PagedParams): Promise<PagedResponse<Diagnosis[]>> => {
  try {
    const response = await backendApi.get('diagnosis/search', { params: { ...params, term } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
