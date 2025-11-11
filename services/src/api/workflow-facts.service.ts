import { FactWithAttachment } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getFactsByIds = async (workflowId: string, factIds: string[]): Promise<FactWithAttachment[]> => {
  try {
    const response = await backendApi.post(`workflow/${workflowId}/facts/by-ids`, {
      factIds
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
