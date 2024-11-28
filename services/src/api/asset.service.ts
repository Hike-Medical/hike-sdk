import { Asset, StreamCompleteParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const uploadComplete = async (assetId: string): Promise<void> => {
  try {
    await backendApi.post(`asset/${assetId}/upload-complete`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const handleStreamComplete = async (assetId: string, params: StreamCompleteParams): Promise<Asset> => {
  try {
    const response = await backendApi.post(`asset/${assetId}/stream-complete`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
