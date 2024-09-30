import { AcceptTermsParams, UserAgreement } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const acceptTerms = async (params: AcceptTermsParams): Promise<UserAgreement> => {
  try {
    const response = await backendApi.post('terms/accept', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
