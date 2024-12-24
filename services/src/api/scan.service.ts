import { CreateMultipartUrls, ProductType, SubmitRenderParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
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

  let headers: {
    [key: string]: string;
  } = { 'Content-Type': 'multipart/form-data' };

  if (companyIds?.length) {
    headers = { ...headers, 'x-company-id': companyIds.join(',') };
  }

  try {
    const response = await backendApi.post('scan/manual-render-upload', formData, {
      headers
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
