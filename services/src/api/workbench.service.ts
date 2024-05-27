import { Asset, Foot, ProductType } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export interface GenerateSignedURLParams {
  footId: string;
  productType: ProductType;
  fileNameWithExtension: string;
}

export interface GenerateSignedURLResponse {
  assetId: string;
  signedUrl: string;
}

export const generateUrlToUploadFile = async ({
  footId,
  productType,
  fileNameWithExtension
}: GenerateSignedURLParams): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`scan/${footId}/pre-signed-url`, {
    productType,
    fileNameWithExtension
  });

  return response.data;
};

export type FootWithAssets = Foot & { assets: Asset[] };

export const getActiveFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  const response = await backendApi.get(`workbench/${workbenchId}/feet`);
  return response.data;
};
