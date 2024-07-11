import { AugmentResult } from '@hike/types';
import { backendApi } from '../utils/backendApi';
import { toResponseError } from '../errors/ResponseError';

export const findAugmentsByWorkbenchId = async (workbenchId: string): Promise<AugmentResult[]> => {
  try {
    const response = await backendApi.get(`augment/workbench/${workbenchId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
