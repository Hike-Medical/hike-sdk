import { ProductType } from '@hike/types';
import { backendApi } from '../utils/backendApi';
import { GenerateSignedURLResponse } from './workbench.service';

export interface GenerateSignedURLDto {
  productType: ProductType;
  fileNameWithExtension: string;
}

export const getPreSignedURL = async (
  footId: string,
  body: GenerateSignedURLDto
): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`foot/${footId}/pre-signed-url`, body);
  return response.data;
};
