import type { EmailTemplate, SendEmailTemplateParams, UpsertEmailTemplateParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const fetchEmailTemplates = async (): Promise<EmailTemplate[]> => {
  try {
    const response = await backendApi.get('email-template');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findEmailTemplateById = async (templateId: string): Promise<EmailTemplate> => {
  try {
    const response = await backendApi.get(`email-template/${templateId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const upsertEmailTemplate = async (params: UpsertEmailTemplateParams): Promise<EmailTemplate> => {
  try {
    const response = await backendApi.post('email-template', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendEmailTemplate = async (templateId: string, params: SendEmailTemplateParams): Promise<void> => {
  try {
    const response = await backendApi.post(`email-template/${templateId}/send`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
