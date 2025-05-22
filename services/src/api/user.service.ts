import {
  GetUsersParams,
  PagedResponse,
  SafeUser,
  SafeUserExtended,
  UpdateUserParams,
  UpdateUserPasswordParams
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

export const fetchCurrentUser = async (): Promise<SafeUser> => {
  try {
    const response = await backendApi.get('user/current');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateUser = async (params: UpdateUserParams): Promise<SafeUser> => {
  try {
    const response = await backendApi.patch('auth/user', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateUserPassword = async (params: UpdateUserPasswordParams): Promise<void> => {
  try {
    const response = await backendApi.patch('auth/user/password', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const activateUser = async (userId: string): Promise<void> => {
  try {
    await backendApi.post(`user/${userId}/activate`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deactivateUser = async (userId: string): Promise<void> => {
  try {
    await backendApi.post(`user/${userId}/deactivate`);
  } catch (error) {
    throw toHikeError(error);
  }
};
