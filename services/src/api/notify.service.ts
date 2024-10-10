import type {
  CampaignWithStats,
  CreateCampaignParams,
  EmailTemplate,
  EnrollPatientsParams,
  Notification,
  NotificationExtended,
  NotificationHistory,
  UpsertEmailTemplateParams
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createCampaign = async (params: CreateCampaignParams): Promise<Notification> => {
  try {
    const response = await backendApi.post('notify/campaign', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCampaigns = async (): Promise<NotificationExtended[]> => {
  try {
    const response = await backendApi.get('notify/campaigns');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getEmailTemplates = async (): Promise<EmailTemplate[]> => {
  try {
    const response = await backendApi.get('notify/email-templates');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const upsertEmailTemplate = async (params: UpsertEmailTemplateParams): Promise<EmailTemplate> => {
  try {
    const response = await backendApi.post('notify/upsert-email-template', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCampaignStats = async (notificationId: string): Promise<CampaignWithStats> => {
  try {
    const response = await backendApi.get(`notify/${notificationId}/stats`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const enrollPatients = async (params: EnrollPatientsParams): Promise<(NotificationHistory | null)[]> => {
  try {
    const response = await backendApi.post('notify/enroll-patients', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const removeQueuedMessages = async (notificationId: string): Promise<NotificationHistory[]> => {
  try {
    const response = await backendApi.post(`notify/${notificationId}/remove-queued-messages`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
