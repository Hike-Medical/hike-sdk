import { VerifyTwoFaBody, TwoFaSetupResponse } from '@hike/types';
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

export const verifyTwoFa = async (body: VerifyTwoFaBody): Promise<{ valid: boolean }> => {
  try {
    const response = await backendApi.post('2fa/verify', body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const disableTwoFa = async (): Promise<void> => {
  try {
    await backendApi.delete('2fa');
  } catch (error) {
    throw toHikeError(error);
  }
};
