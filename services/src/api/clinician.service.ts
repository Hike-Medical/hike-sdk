import {
  AssignClinicianParams,
  Clinician,
  ClinicianExtended,
  CreateClinicianParams,
  UpdateClinicianParams,
  GetCliniciansParams,
  PagedResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
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

export const fetchUnassignedClinician = async (clinicianId: string): Promise<Clinician> => {
  try {
    const response = await backendApi.get(`auth/clinician/unassigned/${clinicianId}`);
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

export const updateClinician = async (
  clinicianId: string,
  params: UpdateClinicianParams
): Promise<Clinician> => {
  try {
    const response = await backendApi.patch(`clinician/${clinicianId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
