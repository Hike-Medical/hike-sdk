import { ProductType } from '@hike/types';
import { backendApi } from '../utils/backendApi';
import { GenerateSignedURLResponse } from './workbench.service';

export interface GenerateSignedURLDto {
  footId: string;
  productType: ProductType;
  videoFormat: string;
}

export const getPreSignedURL = async (
  footId: string,
  body: Omit<GenerateSignedURLDto, 'footId'>
): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`scan/${footId}/pre-signed-url`, body);
  return response.data;
};
