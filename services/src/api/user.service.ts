import { GetUsersParams, PagedResponse, UserExtended } from '@hike/types';
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
export const fetchUserById = async (userId: string): Promise<UserExtended> => {
  try {
    const response = await backendApi.get<UserExtended>(`v2/user/${userId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
