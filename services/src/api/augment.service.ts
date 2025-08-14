import {
  AssetAugment,
  AssetAugmentMediaResult,
  AssetAugmentResult,
  AssetAugmentStatus,
  AssetAugmentStatusForAugmentId,
  AssetAugmentType,
  UpdateAssetAugmentMedia,
  AugmentExtended,
  GetAugmentsParams,
  PagedResponse,
  GetNeedsValidationWorkbenchParams,
  ManufacturingWorkbench
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';
import { addHeaders } from '@hike/utils';

export const findAssetAugmentsByFootId = async (footId: string): Promise<AssetAugment[]> => {
  try {
    const response = await backendApi.get(`augment/foot/${footId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findAssetAugmentsByWorkbenchId = async (workbenchId: string): Promise<AssetAugmentResult[]> => {
  try {
    const response = await backendApi.get(`augment/workbench/${workbenchId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findAssetAugmentById = async (augmentId: string): Promise<AssetAugmentResult> => {
  try {
    const response = await backendApi.get(`augment/${augmentId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateAssetAugmentMedia = async (
  mediaId: string,
  updateAssetAugmentMediaDto: UpdateAssetAugmentMedia
): Promise<AssetAugmentMediaResult> => {
  try {
    const response = await backendApi.patch(`augment/media/${mediaId}`, updateAssetAugmentMediaDto);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
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
    throw toHikeError(error);
  }
};

export const findAssetAugmentStatusByAugmentId = async (augmentId: string): Promise<AssetAugmentStatusForAugmentId> => {
  try {
    const response = await backendApi.get(`augment/${augmentId}/status`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findAugmentByAssetIdAndType = async (assetId: string, augmentType: AssetAugmentType) => {
  try {
    const response = await backendApi.get(`asset/${assetId}/${augmentType}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findAugments = async (params?: GetAugmentsParams): Promise<PagedResponse<AugmentExtended[]>> => {
  try {
    const response = await backendApi.get('augment', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const exportAugments = async (params?: GetAugmentsParams): Promise<Blob> => {
  try {
    const response = await backendApi.get('augment/data/export', {
      params,
      responseType: 'arraybuffer'
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getNeedsValidationWorkbenches = async (
  params?: GetNeedsValidationWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<ManufacturingWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/needs-validation', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
