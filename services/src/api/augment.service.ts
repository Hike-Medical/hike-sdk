import { AugmentMedia, AugmentResult, AugmentStatus, AugmentType, UpdateAugmentMedia } from '@hike/types';
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

export const findAugmentById = async (augmentId: string): Promise<AugmentResult> => {
  try {
    const response = await backendApi.get(`augment/${augmentId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const updateAugmentMedia = async (
  mediaId: string,
  updateAugmentMediaDto: UpdateAugmentMedia
): Promise<AugmentMedia> => {
  try {
    const response = await backendApi.patch(`augment/media/${mediaId}`, updateAugmentMediaDto);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findAugmentStatusByWorkbenchId = async (
  workbenchId: string,
  type: AugmentType
): Promise<AugmentStatus> => {
  try {
    const response = await backendApi.post(`augment/workbench/${workbenchId}/status`, { type });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
