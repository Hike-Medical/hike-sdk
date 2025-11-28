import {
  CompanyPermission,
  CreateUserParams,
  GetUsersParams,
  PagedResponse,
  SafeUser,
  SafeUserExtended,
  UpdateContactParams,
  UpdateUserParams,
  UpdateUserPasswordParams,
  UpsertPermissionsParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createUser = async (params: CreateUserParams): Promise<SafeUserExtended> => {
  try {
    const response = await backendApi.post('user', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

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

/**
 * Update user contact using OTP to verify ownership of new contact.
 */
export const updateUserContact = async (params: UpdateContactParams): Promise<SafeUser> => {
  try {
    const response = await backendApi.put(`user/contact/${params.token}`);
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

export const upsertUserPermissions = async (userId: string, params: UpsertPermissionsParams): Promise<void> => {
  try {
    await backendApi.post(`user/permissions/${userId}`, params);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const removeUserPermissions = async (userId: string, permissions: CompanyPermission[]): Promise<void> => {
  try {
    await backendApi.delete(`user/permissions/${userId}`, { params: { permissions } });
  } catch (error) {
    throw toHikeError(error);
  }
};
