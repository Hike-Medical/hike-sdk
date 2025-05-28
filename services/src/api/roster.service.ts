import {
  DeactivateRosterParams,
  DeactivateRosterResponse,
  GenerateRosterUploadLinkParams,
  ImportRosterParams,
  ImportRosterResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const importRoster = async (data: ImportRosterParams): Promise<{ jobId?: string }> => {
  try {
    const response = await backendApi.post('roster/import', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deactivateRoster = async (data: DeactivateRosterParams): Promise<{ jobId?: string }> => {
  try {
    const response = await backendApi.post('roster/deactivate', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchRosterImportStatus = async (
  jobId: string
): Promise<{ progress: number; data?: ImportRosterResponse }> => {
  try {
    const response = await backendApi.get(`roster/import/${jobId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchRosterDeactivateStatus = async (
  jobId: string
): Promise<{ progress: number; data?: DeactivateRosterResponse }> => {
  try {
    const response = await backendApi.get(`roster/deactivate/${jobId}`);
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
