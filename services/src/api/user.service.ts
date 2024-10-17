import {
  AssignClinicianParams,
  Clinician,
  ClinicianExtended,
  GetCliniciansParams,
  GetUsersParams,
  PagedResponse,
  SafeUserExtended
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const fetchUsers = async (params?: GetUsersParams): Promise<PagedResponse<SafeUserExtended[]>> => {
  try {
    const response = await backendApi.get('user', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchClinicians = async (params?: GetCliniciansParams): Promise<PagedResponse<ClinicianExtended[]>> => {
  try {
    const response = await backendApi.get('user/clinicians', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchClinician = async (): Promise<Clinician | null> => {
  try {
    const response = await backendApi.get('user/clinician');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const assignClinician = async (params: AssignClinicianParams): Promise<Clinician> => {
  try {
    const response = await backendApi.post('user/clinician', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
