import { backendApi } from '../utils/backendApi';

export const uploadComplete = async (assetId: string): Promise<void> => {
  await backendApi.post(`asset/${assetId}/upload-complete`);
};
