import { RunAutoSlicerParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const runSlicerForSide = async (body: RunAutoSlicerParams, companyIds?: string[]) => {
  try {
    const response = await backendApi.post(`auto-slicer/custom-profile`, body, {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
