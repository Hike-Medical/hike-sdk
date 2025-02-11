import type {
  CampaignWithStats,
  CreateCampaignParams,
  EmailTemplate,
  EnrollPatientsParams,
  GetCampaignParams,
  Notification,
  NotificationExtended,
  NotificationHistory,
  NotifyWebhookInfo,
  SendEmailTemplateParams,
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

export const getWebhookInfo = async (): Promise<NotifyWebhookInfo[]> => {
  try {
    const response = await backendApi.get(`notify/webhook/info`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCampaigns = async (
  params?: GetCampaignParams,
  companyIds?: string[]
): Promise<NotificationExtended[]> => {
  try {
    let headers: {
      [key: string]: string;
    } = {};

    if (companyIds?.length) {
      headers = { ...headers, 'x-company-id': companyIds.join(',') };
    }

    const response = await backendApi.get('notify/campaigns', { params, headers });
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

export const getCampaignStats = async (notificationId: string, companyIds?: string[]): Promise<CampaignWithStats> => {
  try {
    let headers: {
      [key: string]: string;
    } = {};

    if (companyIds?.length) {
      headers = { ...headers, 'x-company-id': companyIds.join(',') };
    }

    const response = await backendApi.get(`notify/${notificationId}/stats`, { headers });
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

export const publishNotification = async (notificationId: string): Promise<Notification> => {
  try {
    const response = await backendApi.post(`notify/${notificationId}/publish`);
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

export const sendEmailTemplate = async (templateId: string, params: SendEmailTemplateParams): Promise<void> => {
  try {
    const response = await backendApi.post(`notify/${templateId}/send`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
