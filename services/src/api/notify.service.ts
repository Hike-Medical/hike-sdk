import type { CreateCampaignParams, Notification } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createCampaign = async (params: CreateCampaignParams): Promise<Notification> => {
  try {
    const response = await backendApi.post('notify/campaign', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCampaigns = async (): Promise<Notification[]> => {
  try {
    const response = await backendApi.get('notify/campaigns');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
