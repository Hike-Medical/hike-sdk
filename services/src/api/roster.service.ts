import { GenerateRosterUploadLinkParams, ImportRosterParams, ImportRosterResponse } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const importRoster = async (data: ImportRosterParams): Promise<{ jobId?: string }> => {
  try {
    const response = await backendApi.post('roster/import', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchRosterImportStatus = async (
  jobId: string
): Promise<{ progress: number; data: ImportRosterResponse }> => {
  try {
    const response = await backendApi.get(`roster/import/${jobId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateRosterUploadLink = async (
  data: GenerateRosterUploadLinkParams
): Promise<{ key: string; presignedUrl: string }> => {
  try {
    const response = await backendApi.post('roster/upload-link', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
