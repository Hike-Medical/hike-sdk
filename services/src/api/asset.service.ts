import { Asset, AssetExtended, AssetStatus, GetAssetsParams, PagedResponse, StreamCompleteParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findAssets = async (params?: GetAssetsParams): Promise<PagedResponse<AssetExtended[]>> => {
  try {
    const response = await backendApi.get('asset', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

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

export const statsForAssets = async (): Promise<{ status: AssetStatus; count: number }[]> => {
  try {
    const response = await backendApi.get('asset/stats');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
