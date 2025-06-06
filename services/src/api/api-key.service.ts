import { ApiKey } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createApiKey = async (): Promise<ApiKey> => {
  try {
    const response = await backendApi.post('api-key');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findApiKeys = async (): Promise<ApiKey[]> => {
  try {
    const response = await backendApi.get('api-key');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateApiKey = async (apiKeyId: string): Promise<ApiKey> => {
  try {
    const response = await backendApi.patch(`api-key/${apiKeyId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revokeApiKey = async (apiKeyId: string): Promise<void> => {
  try {
    await backendApi.delete(`api-key/${apiKeyId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};
