import type {
  GenerateAppointmentsUploadLinkParams,
  ImportAppointmentsParams,
  ImportAppointmentsResponse,
  ParseAppointmentColumnsParams,
  ParseAppointmentColumnsResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const importAppointments = async (data: ImportAppointmentsParams): Promise<{ jobId?: string }> => {
  try {
    const response = await backendApi.post('appointment/import', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};


export const fetchAppointmentsImportStatus = async (
  jobId: string
): Promise<{ progress: number; data?: ImportAppointmentsResponse }> => {
  try {
    const response = await backendApi.get(`appointment/import/${jobId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};


export const generateAppointmentsUploadLink = async (
  data: GenerateAppointmentsUploadLinkParams
): Promise<{ key: string; presignedUrl: string }> => {
  try {
    const response = await backendApi.post('appointment/upload-link', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const parseAppointmentColumns = async (
  data: ParseAppointmentColumnsParams
): Promise<ParseAppointmentColumnsResponse> => {
  try {
    const response = await backendApi.post('appointment/columns', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
