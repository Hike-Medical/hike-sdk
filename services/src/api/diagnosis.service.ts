import type { Diagnosis, PagedParams, PagedResponse } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findDiagnosisByCode = async (code: string): Promise<Diagnosis> => {
  const response = await backendApi.get(`diagnosis/${code}`);
  return response.data;
};

export const fetchDiagnoses = async (params?: PagedParams): Promise<PagedResponse<Diagnosis[]>> => {
  const response = await backendApi.get('diagnosis', { params });
  return response.data;
};

export const searchDiagnoses = async (term: string, params?: PagedParams): Promise<PagedResponse<Diagnosis[]>> => {
  const response = await backendApi.get('diagnosis/search', { params: { ...params, term } });
  return response.data;
};
