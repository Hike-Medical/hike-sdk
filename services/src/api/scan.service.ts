import { CreateMultipartUrls, ProductType, SubmitRenderParams } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export interface GenerateSignedURLParams {
  assetId?: string;
  footId: string;
  productType: ProductType;
  mimeTypeOrExtension: string;
  suggestedFootSide?: string;
  useMultipart?: boolean;
  fileSize?: number;
}

export interface GenerateSignedURLResponse {
  assetId: string;
  signedUrl: string;
}

export const getPreSignedURL = async (
  footId: string,
  body: Omit<GenerateSignedURLParams, 'footId'>
): Promise<GenerateSignedURLResponse | CreateMultipartUrls> => {
  try {
    const response = await backendApi.post(`scan/${footId}/pre-signed-url`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const uploadFootRender = async (file: File, body: SubmitRenderParams, companyIds: string[]) => {
  const formData = new FormData();
  formData.append('foot', file);

  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await backendApi.post('scan/manual-render-upload', formData, {
      headers: addHeaders(companyIds, { 'Content-Type': 'multipart/form-data' })
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
