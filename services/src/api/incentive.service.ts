import { Incentive, IncentiveType } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const fetchReferralIncentive = async (incentiveType: IncentiveType): Promise<Incentive> => {
  try {
    const response = await backendApi.get(`incentive/${incentiveType}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
