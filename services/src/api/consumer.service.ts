import { Workbench } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const consumerSubmitWorkbench = async (workbenchId: string): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`consumer/workbench/${workbenchId}/submit`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
