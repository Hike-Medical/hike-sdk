import {
  AssignClinicianParams,
  Clinician,
  ClinicianExtended,
  GetCliniciansParams,
  GetUsersParams,
  PagedResponse,
  UserExtended
} from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const fetchUsers = async (params?: GetUsersParams): Promise<PagedResponse<UserExtended[]>> => {
  try {
    const response = await backendApi.get('user', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchClinicians = async (params?: GetCliniciansParams): Promise<PagedResponse<ClinicianExtended[]>> => {
  try {
    const response = await backendApi.get('user/clinicians', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchClinician = async (): Promise<Clinician | null> => {
  try {
    const response = await backendApi.get('user/clinician');
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const assignClinician = async (params: AssignClinicianParams): Promise<Clinician> => {
  try {
    const response = await backendApi.post('user/clinician', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
