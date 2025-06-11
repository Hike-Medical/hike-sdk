import { TwoFaSetupResponse, TwoFaVerifyParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const setupTwoFa = async (): Promise<TwoFaSetupResponse> => {
  try {
    const response = await backendApi.post('auth/account/2fa/setup');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const verifyTwoFa = async (params: TwoFaVerifyParams): Promise<{ valid: boolean }> => {
  try {
    const response = await backendApi.post('auth/account/2fa/verify', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const disableTwoFa = async (): Promise<void> => {
  try {
    await backendApi.delete('auth/account/2fa');
  } catch (error) {
    throw toHikeError(error);
  }
};
