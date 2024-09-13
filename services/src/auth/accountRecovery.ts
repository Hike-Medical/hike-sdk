import { AccountRecoveryParams, PasswordResetParams } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const accountRecovery = async (params: AccountRecoveryParams): Promise<void> => {
  try {
    const response = await backendApi.post('auth/account/recovery', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const resetPassword = async (params: PasswordResetParams): Promise<void> => {
  try {
    const response = await backendApi.post('auth/password/reset', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
