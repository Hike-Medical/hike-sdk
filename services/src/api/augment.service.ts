import {
  AssetAugment,
  AssetAugmentMedia,
  AssetAugmentResult,
  AssetAugmentStatus,
  AssetAugmentStatusForAugmentId,
  AssetAugmentType,
  UpdateAssetAugmentMedia
} from '@hike/types';
import { backendApi } from '../utils/backendApi';
import { toResponseError } from '../errors/ResponseError';

export const findAssetAugmentsByFootId = async (footId: string): Promise<AssetAugment[]> => {
  try {
    const response = await backendApi.get(`augment/foot/${footId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findAssetAugmentsByWorkbenchId = async (workbenchId: string): Promise<AssetAugmentResult[]> => {
  try {
    const response = await backendApi.get(`augment/workbench/${workbenchId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findAssetAugmentById = async (augmentId: string): Promise<AssetAugmentResult> => {
  try {
    const response = await backendApi.get(`augment/${augmentId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const updateAssetAugmentMedia = async (
  mediaId: string,
  updateAssetAugmentMediaDto: UpdateAssetAugmentMedia
): Promise<AssetAugmentMedia> => {
  try {
    const response = await backendApi.patch(`augment/media/${mediaId}`, updateAssetAugmentMediaDto);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findAssetAugmentStatusByWorkbenchId = async (
  workbenchId: string,
  type: AssetAugmentType
): Promise<AssetAugmentStatus> => {
  try {
    const response = await backendApi.post(`augment/workbench/${workbenchId}/status`, { type });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findAssetAugmentStatusByAugmentId = async (augmentId: string): Promise<AssetAugmentStatusForAugmentId> => {
  try {
    const response = await backendApi.get(`augment/${augmentId}/status`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
