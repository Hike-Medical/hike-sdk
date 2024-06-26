import { ProductType } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export interface GenerateSignedURLParams {
  footId: string;
  productType: ProductType;
  mimeTypeOrExtension: string;
}

export interface GenerateSignedURLResponse {
  assetId: string;
  signedUrl: string;
}

export const getPreSignedURL = async (
  footId: string,
  body: Omit<GenerateSignedURLParams, 'footId'>
): Promise<GenerateSignedURLResponse> => {
  try {
    const response = await backendApi.post(`scan/${footId}/pre-signed-url`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
