import { AssignClinicianParams, Clinician, ClinicianExtended, GetCliniciansParams, PagedResponse } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

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

export const assignClinician = async (params: AssignClinicianParams): Promise<Clinician> => {
  try {
    const response = await backendApi.post('clinician/assign', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
