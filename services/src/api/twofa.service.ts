import { TwoFaSetupResponse, TwoFaToggleParams, TwoFaVerifyParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const setupTwoFa = async (): Promise<TwoFaSetupResponse> => {
  try {
    const response = await backendApi.post('2fa/setup');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const verifyTwoFa = async (params: TwoFaVerifyParams): Promise<void> => {
  try {
    const response = await backendApi.post('2fa/verify', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const toggleTwoFa = async (params: TwoFaToggleParams): Promise<void> => {
  try {
    await backendApi.post('2fa/toggle', params);
  } catch (error) {
    throw toHikeError(error);
  }
};
