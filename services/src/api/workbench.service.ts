import { ProductType } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export interface GenerateSignedURLParams {
  footId: string;
  productType: ProductType;
  contentType: string;
}

export interface GenerateSignedURLResponse {
  assetId: string;
  signedUrl: string;
}

export const generateUrlToUploadFile = async ({
  productType,
  contentType,
  footId
}: GenerateSignedURLParams): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`scan/${footId}/pre-signed-url`, {
    productType,
    contentType
  });

  return response.data;
};
