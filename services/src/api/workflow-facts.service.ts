import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export interface FactWithAttachment {
  id: string;
  key: string;
  value: any;
  source: string;
  acquiredAt: string;
  updatedAt: string;
  metadata?: any;
  sourceAttachment?: {
    id: string;
    name: string;
    bucket: string;
    key: string;
    region: string;
    presignedUrl: string;
  };
}

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
