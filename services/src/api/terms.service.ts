import { AcceptTermsParams, UserAgreement } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const acceptTerms = async (params: AcceptTermsParams, companyId?: string): Promise<UserAgreement> => {
  try {
    const response = await backendApi.post(
      'terms/accept',
      params,
      companyId
        ? {
            headers: { 'x-company-id': companyId }
          }
        : undefined
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
