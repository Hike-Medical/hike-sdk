import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const uploadComplete = async (assetId: string): Promise<void> => {
  try {
    await backendApi.post(`asset/${assetId}/upload-complete`);
  } catch (error) {
    throw toHikeError(error);
  }
};
