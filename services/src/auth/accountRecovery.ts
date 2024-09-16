import { AccountRecoveryParams, PasswordResetParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const accountRecovery = async (params: AccountRecoveryParams): Promise<void> => {
  try {
    const response = await backendApi.post('auth/account/recovery', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const resetPassword = async (params: PasswordResetParams): Promise<void> => {
  try {
    const response = await backendApi.post('auth/password/reset', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
