import { ProductType } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export interface GenerateSignedURLDto {
  footId: string;
  productType: ProductType;
  videoFormat: string;
}

export interface GenerateSignedURLParams {
  footId: string;
  productType: ProductType;
  videoType: string;
}

export interface GenerateSignedURLResponse {
  assetId: string;
  signedUrl: string;
}

export const getPreSignedURL = async (
  footId: string,
  body: Omit<GenerateSignedURLDto, 'footId'>
): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`scan/${footId}/pre-signed-url`, body);
  return response.data;
};

export const generateUrlToUploadFile = async ({
  footId,
  productType,
  videoType
}: GenerateSignedURLParams): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`scan/${footId}/pre-signed-url`, {
    productType,
    videoType
  });

  return response.data;
};
