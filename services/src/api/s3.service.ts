import { CreatePresignedUrlParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createPresignedUrl = async (createPresignedUrlParams: CreatePresignedUrlParams): Promise<string> => {
  const params = new URLSearchParams();
  params.append('bucketName', createPresignedUrlParams.bucketName);
  params.append('key', createPresignedUrlParams.key);
  params.append('expiry', createPresignedUrlParams.expiry.toString());
  const response = await backendApi.get('s3/presignedUrl', { params });
  return response.data;
};
