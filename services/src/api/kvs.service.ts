import { GetSignalingChannelParams, SignalingChannelResponse } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const getSignalingChannel = async (
  workbenchId: string,
  params: GetSignalingChannelParams
): Promise<SignalingChannelResponse> => {
  try {
    const response = await backendApi.post(`kvs/channel/${workbenchId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
