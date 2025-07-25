import type { PagedParams, PagedResponse, PatientExtended, Physician, UpsertPrimaryPhysicianParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchPhysicians = async (params?: PagedParams): Promise<PagedResponse<Physician[]>> => {
  try {
    const response = await backendApi.get('physician', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchPhysicians = async (term: string, params?: PagedParams): Promise<PagedResponse<Physician[]>> => {
  try {
    const response = await backendApi.get('physician/search', { params: { ...params, term } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const upsertPrimaryPhysician = async (
  patientId: string,
  params: UpsertPrimaryPhysicianParams
): Promise<PatientExtended> => {
  try {
    const response = await backendApi.patch(`physician/${patientId}/physician`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendComplianceFax = async (patientId: string): Promise<void> => {
  try {
    await backendApi.post(`physician/${patientId}/fax`);
  } catch (error) {
    throw toHikeError(error);
  }
};
