import { Clinician, GetUsersParams, PagedResponse, UserExtended } from '@hike/types';
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

export const fetchClinician = async (): Promise<Clinician | null> => {
  try {
    const response = await backendApi.get('user/clinician');
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
