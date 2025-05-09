import {
  AssignClinicianParams,
  Clinician,
  ClinicianExtended,
  CreateClinicianParams,
  GetCliniciansParams,
  PagedResponse
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createClinician = async (params: CreateClinicianParams): Promise<Clinician> => {
  try {
    const response = await backendApi.post('clinician', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchClinicians = async (params?: GetCliniciansParams): Promise<PagedResponse<ClinicianExtended[]>> => {
  try {
    const response = await backendApi.get('clinician', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchClinician = async (): Promise<Clinician | null> => {
  try {
    const response = await backendApi.get('clinician/current');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchUnassignedClinicians = async (name: string): Promise<Clinician[]> => {
  try {
    const response = await backendApi.get('clinician/unassigned', { params: { name } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const assignClinician = async ({ clinicianId, userId }: AssignClinicianParams): Promise<Clinician> => {
  try {
    const response = await backendApi.post(`clinician/assign/${clinicianId}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
