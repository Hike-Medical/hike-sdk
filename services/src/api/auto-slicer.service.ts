import { RunAutoSlicerParams } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const runSlicerForSide = async (body: RunAutoSlicerParams, companyIds?: string[]) => {
  try {
    const response = await backendApi.post(`auto-slicer/custom-profile`, body, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
